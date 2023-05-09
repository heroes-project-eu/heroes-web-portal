import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  MIcon,
  MLabel,
  MContainer,
  MButton,
} from "../../styles/styled_components";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { MDiv } from "../Minio/styles";
import DataTable from "react-data-table-component";
import prettyBytes from "pretty-bytes";

const ListJobs = () => {
  const [jobs, setJobs] = useState(null);
  const [isAnyJob, setIsAnyjob] = useState(false);
  const [jobError, setjobError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [jobID, setJobID] = useState(null);
  const [redirState, setRedirState] = useState(false);

 
  const navigate = useNavigate();
  let redirecting = redirState ? (<Navigate to={`/workflows/${jobID}`}/>) : '';

  const ENDPOINT = "https://api.heroes-project.eu";
  const jwt = window.sessionStorage.getItem("jwt");

  const getJobs = async () => {
    fetch(
      `${ENDPOINT}/organization/workflow/instance?workflow_template_id=1&skip=0&limit=100`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: `${jwt}`,
        },
      }
    )
      .then((response) => response.json())
      .then((jobs) => {
        setJobs(jobs);
        setIsAnyjob(true);
        setjobError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error: ", +error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    if (hours >= 1) {
      return `${hours} h`;
    } else if (minutes >= 1) {
      return `${minutes} min`;
    } else {
      return `${seconds} s`;
    }
  };

  const statusStyling = (status) => {
    const upperStatus = status.toUpperCase();
    switch (upperStatus) {
      case "FAILED":
        return { color: "red" };
      case "CANCELED":
        return { color: "yellow" };
      case "COMPLETED":
        return { color: "green" };
      case "PENDING":
        return { color: "gray" };
      default:
        return {};
    }
  };
  
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: "date",
      name: "Date",
      selector: (row) => row.execution_time,
      sortable: true,
    },
    {
      name: "Directory",
      selector: (row) => row.input_dir,
    },
    {
      name: "Requested CPU",
      selector: (row) => row.requested_cpu,
    },
    {
      name: "Requested memory",
      selector: (row) => prettyBytes(parseInt(row.requested_memory.split(" ")[0])),
    },
    {
      name: "Requested time",
      selector: (row) => formatTime(parseInt(row.requested_time.split("s")[0])),
    },
    {
      name: "Status",
      selector: (row) => <div style={statusStyling(row.status)}>{row.status}</div>,
    },
  ];

  const rowClicked = (row) => {
    setJobID(row.id);
    if (row.id != null)  {
      console.log("show details")
      setShowDetails(true); // Change to true if show details
    }
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "blue",
        // userSelect: "none"
      },
    },
  ];


  return (
    <MDiv>
      <h1>My Workflows</h1>
      {/* change false by isLoading */}
      {isLoading ? (
        <p> Loading ...</p>
      ) : (
        <div>
          <MButton onClick={() => navigate("/workflows/new")}>
            <MContainer>
              <MLabel>
                <MIcon>
                  <AiOutlineNodeExpand />
                </MIcon>
                Create a new workflow
              </MLabel>
            </MContainer>
          </MButton>
          <br />
          <br />
          {isAnyJob ? (
            <DataTable
              columns={columns}
              data={jobs}
              onRowClicked={jobs =>  {
                setRedirState(true)
                setJobID(jobs.id)
              }}
              highlightOnHover={true}
              defaultSortFieldId="date"
              pointerOnHover={true}
              pagination
              conditionalRowStyles={conditionalRowStyles}
              defaultSortAsc={false}
            />
          ) : (
            <p>No jobs...</p>
          )}
            {redirecting}
{/*           {showDetails ? 
            <Navigate to={`/workflows/${jobID}`}></Navigate> : null} */}
          {jobError ? <p>No response from the server</p> : null}{" "}
        </div>
      )}
    </MDiv>
  );
};

export default ListJobs;
