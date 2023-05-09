import { useEffect, useState} from "react"
import { useParams, Link } from "react-router-dom"
import { MDivInline2, MDivInline } from "../../styles/styled_components"
import { MDiv } from "../Minio/styles"
import prettyBytes from "pretty-bytes";

const JobDetails = () => {

    const {job_id} = useParams()
    const [jobDetail, setJobDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //const [templateDetail, setTemplateDetail] = useState([]) 

    const ENDPOINT = "https://api.heroes-project.eu";
    const jwt = window.sessionStorage.getItem("jwt");


    const getObjectDetails = async () => {
        let url = `${ENDPOINT}/organization/workflow/instance/${job_id}`
        fetch(
            url,
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
        .then((detail) => {
            setIsLoading(false)
            setJobDetail(detail)
        })
    }

/*     const getTemplates = async () => {
        fetch(`${ENDPOINT}/organization/workflow/template`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                token: `${jwt}`,
            },
        })
        .then((response) => response.json())
        .then((temps) => {
        setTemplateDetail(temps);
        })
        .catch((error) => {
            console.log("template error" + error);
        });
    }; */

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


    useEffect(() => {
        getObjectDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <MDiv>
            <h1>Workflow details of id {job_id}</h1>
        </MDiv>
        <br/><br/>
        <br/><br/>
        { isLoading ? <p>Loading worflow details...</p> :
        <>
        <MDivInline2>
            <h4>Workflow name: </h4>
        </MDivInline2>
        <MDivInline>
            <p>{jobDetail.name}</p>
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Status: </h4>
        </MDivInline2>
        <MDivInline>
            <p><div style={statusStyling(jobDetail.status)}>{jobDetail.status}</div></p>
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Executed on: </h4>
        </MDivInline2>
        <MDivInline>
            <p>{jobDetail.execution_time}</p>
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Input directory (size): </h4>
        </MDivInline2>
        <MDivInline>
            <p>{jobDetail.input_dir }    ({prettyBytes(parseInt(jobDetail.input_size))})</p>
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Requested CPU: </h4>
        </MDivInline2>
        <MDivInline>
            <p>{jobDetail.requested_cpu} core(s)</p>
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Requested memory: </h4>
        </MDivInline2>
        <MDivInline>
            {prettyBytes(parseInt(jobDetail.requested_memory.split(" ")[0]))}
        </MDivInline>
        <br/><br/>
        <MDivInline2>
            <h4>Requested time: </h4>
        </MDivInline2>
        <MDivInline>
            <p>{parseInt(jobDetail.requested_time.split("s")[0])/3600} hours</p>
        </MDivInline>
        <br></br>
        <br></br>
        <MDivInline2>
            <Link to="/workflows">Back to workflows</Link>
        </MDivInline2>
        </>
        }
        </>
    )

}

export default JobDetails