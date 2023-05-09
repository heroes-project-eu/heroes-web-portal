import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import DataTable from "react-data-table-component";
import prettyBytes from "pretty-bytes";

const Home = () => {
  const { isLogged } = useUser();
  //const org_item = window.sessionStorage.getItem("org");
  const jwt = window.sessionStorage.getItem("jwt");
  const ENDPOINT = "https://api.heroes-project.eu";

  const [username, setUsername] = useState("");
  const [runJobs, setRunJobs] = useState([]);
  const [isAnyJob, setIsAnyjob] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [isAnyBucket, setIsAnyBucket] = useState(false);

  const getUserinfo = async () => {
    fetch(`${ENDPOINT}/organization/auth/me`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((usr) => {
        setUsername(usr.preferred_username);
        console.log(username)
      })
      .catch((error) => {
        console.log("can't retrieve user info", error);
      });
  };

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
        if (jobs.length > 5)
          setRunJobs(jobs.slice(1).slice(-5));
        else
          setRunJobs(jobs)
        setIsAnyjob(true);
      })
      .catch((error) => {
        console.log("error: ", +error);
      });
  };

  const getBuckets = async () => {
    fetch(`${ENDPOINT}/organization/data/list`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((buckets) => {
        if (buckets !== "") {
          if (buckets.length > 5)
            setBuckets(buckets.slice(1).slice(-5));
          else
            setBuckets(buckets)
          setIsAnyBucket(true);
        }
      });
  };

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

  const job_columns = [
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
      selector: (row) =>  formatTime(parseInt(row.requested_time.split("s")[0])),
    },
  ];

  const bucket_columns = [
    {
      name: "Bucket name",
      selector: (row) => row.bucket_name,
      sortable: true,
    },
    {
      name: "Creation date",
      selector: (row) => row.creation_date,
      sortable: true,
    },
  ];

  useEffect(() => {
    getUserinfo();
    getJobs()
    getBuckets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLogged ? (
        <div>
          <h1>Hi {username}!</h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h3>Your newest buckets</h3>
          <div>
            {isAnyBucket ? (
              <DataTable
                columns={bucket_columns}
                data={buckets}
                defaultSortFieldId="name"
              />
            ) : (
              <p>No buckets ...</p>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h3>Your recent jobs</h3>
          <div>
            {isAnyJob ? (
              <DataTable
                columns={job_columns}
                data={runJobs}
                defaultSortFieldId="date"
                defaultSortAsc={false}
              />
            ) : (
              <p>No jobs ...</p>
            )}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Home;
