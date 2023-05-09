import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import moment from "moment";
import { Combobox } from "react-widgets";
import {
  MButton,
  MDivHead,
  MDivLeft,
  MIcon,
  MInput,
  MLabel,
  MDivInline,
  MDivT,
  MContainer,
} from "../../styles/styled_components";
import { AiOutlineDoubleRight } from "react-icons/ai";
import DataTable from "react-data-table-component";
import "react-widgets/styles.css";
import decision_mod_logo from "../Shared/predictit.png";
import axios from "axios";

const NewJob = () => {
  const [job_name, setJobName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [templateValue, setTemplateValue] = useState("");
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const [isPredDone, setPredDone] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [isClusterSelected, setIsClusterSelected] = useState(false);
  const [foldernames, setFolderNames] = useState([]);
  const [foldername, setFolderName] = useState("");
  const [buckets, setBuckets] = useState([]);
  const [bucket, setBucket] = useState("");
  const [cpus, setCpus] = useState("");
  const [memory, setMemory] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [policy, setPolicy] = useState("performance");
  const [rank, setRank] = useState("workload");
  const [disClusters, setDisClusters] = useState([]);
  const [predClusters, setPredClusters] = useState([]);
  const [isPredLoading, setPredLoading] = useState(false);
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [submitID, setSubmitId] = useState();

  const ENDPOINT = "https://api.heroes-project.eu";
  const jwt = window.sessionStorage.getItem("jwt");

  const getTemplates = async () => {
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
        setTemplates(temps);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  const getPolicies = async () => {
    fetch(`${ENDPOINT}/organization/decision/policies`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((polic) => {
        setPolicies(polic.policies);
        setRankings(polic.rankings);
      })
      .catch((error) => {
        console.log("error" + error);
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
        setBuckets(buckets);
      });
  };

  // Get bucket content
  const listObjectsOfBucket = async (buckt) => {
    fetch(
      `${ENDPOINT}/organization/data/bucket/${buckt}/list?bucket_recursive=true`,
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
      .then((objects) => {
        setFolderNames(objects.filter((str) => str.is_dir === true));
      });
  };

  const data_decide = {
    data: [
      {
        JobName: job_name,
        Requested_Memory: memory,
        Requested_Cores: cpus,
        Timelimit: timelimit,
        Application: templateValue.name,
      },
    ],
  };

  const postDecide = async () => {
    let decide_url = `${ENDPOINT}/organization/decision/decide?policy=${policy}&ranking=${rank}&workflow_template_id=${
      templateValue.id
    }&workflow_input_dir=${bucket.bucket_name + "/" + foldername.object_name}}`;
    setPredLoading(true);

    const res = await axios.post(decide_url, data_decide, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    });
    if (!res) {
      setPredLoading(false);
      throw new Error("not a good response from Decide");
    } else {
      setPredDone(true);
      setPredLoading(false);
      setPredClusters(res.data.ranking[0]);
      setDisClusters(res.data.dismissed_clusters[0]);
    }
    return res;
  };

  const data_submit = {
    workflow_name: job_name,
    workflow_input_dir: "/" + bucket.bucket_name + "/" + foldername.object_name,
    workflow_placement: {
      cluster: selectedCluster,
    },
    workflow_parameters: {
      cpus: cpus,
      memory: String(memory),
      time: timelimit,
    },
  };
/* 
  const postSubmit = async () => {
    let submit_url = `${ENDPOINT}/organization/workflow/submit?workflow_template_id=${templateValue.id}`;

    setSubmitLoading(true);

    const res = await axios.post(submit_url, data_submit, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    });
    if (!res) {
      setSubmitLoading(false);
      throw new Error("not a good response from submit");
    } else {
      console.log(res, "submitted");
      setSubmitId(res.id)
      setSubmitted(true)
      setSubmitLoading(false)
    }
    return res;
  }; */

  const postSubmit = async () => {
    let submit_url = `${ENDPOINT}/organization/workflow/submit?workflow_template_id=${templateValue.id}`;

    setSubmitLoading(true);

    const res = await axios.post(submit_url, data_submit, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: `${jwt}`,
      },
    }).then((res) => {
      console.log(res, "submitted");
      setSubmitId(res.data.id)
      setSubmitted(true)
      setSubmitLoading(false)
    }).catch((err) => {
      console.log(err)
      console.log("Submitted info", data_submit)
      console.log("Submitted url", submit_url)
    })
  };

  useEffect(() => {
    getTemplates();
    getPolicies();
    getBuckets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJobnameChange = ({ target: { value } }) => {
    if (value === "") {
      setJobName(null);
    } else {
      setJobName(value);
    }
  };

  const handleMemoryChange = ({ target: { value } }) => {
    if (value === "") {
      setMemory(null);
    } else {
      let memory_val = value * 1073741824; // From GB to B
      setMemory(memory_val);
    }
  };

  const handleCPUChange = ({ target: { value } }) => {
    if (value === "") {
      setCpus(null);
    } else {
      setCpus(value);
    }
  };

  const handleTimeChange = ({ target: { value } }) => {
    if (value === "") {
      setTimelimit(null);
    } else {
      let value_split = value.split(":");
      let time = 0;
      let seconds = 0;
      let minutes = 0;
      let hours = 0;
      switch (value_split.length) {
        case 1:
          time = value;
          break;
        case 2:
          seconds = value_split[1];
          minutes = value_split[0];
          time = seconds + 60 * minutes;
          break;
        default:
          seconds = value_split[2];
          minutes = value_split[1];
          hours = value_split[0];
          time = seconds + 60 * minutes + 3600 * hours;
      }
      setTimelimit(time);
    }
  };

  const callPredictIT = () => {
    postDecide();
  };

  // For datatable

  const columns_template = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Container",
      selector: (row) => row.container_path,
      sortable: true,
    },
    {
      name: "Script",
      selector: (row) => row.script_template_path,
      sortable: true,
    },
  ];

  const columns_decision = [
    {
      id: "rank",
      name: "Rank",
      selector: (row) => row.rank,
      sortable: true,
    },
    {
      name: "Cluster name",
      selector: (row) => row.cluster,
      sortable: true,
    },
    {
      name: "Pred. cost (EUR)",
      selector: (row) => row.predictions.cost,
      sortable: true,
    },
    {
      name: "Conf.cost",
      selector: (row) => row.confidence.time,
      sortable: true,
    },
    {
      name: "Pred. time (sec)",
      selector: (row) => row.predictions.time,
      sortable: true,
    },
    {
      name: "Conf. time",
      selector: (row) => row.confidence.time,
      sortable: true,
    },
    {
      name: "Pred. energy (joules)",
      selector: (row) => row.predictions.energy,
      sortable: true,
    },
    {
      name: "Conf. energy",
      selector: (row) => row.confidence.energy,
      sortable: true,
    },
  ];

  const columns_disc = [
    {
      name: "Cluster name",
      selector: (row) => row.name,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
    },
  ];

  const rowDecisionClicked = (row) => {
    setSelectedCluster(row.cluster);
    setIsClusterSelected(true);
  };

  const rowTemplateClicked = (row) => {
    setTemplateValue(row);
    setIsTemplateSelected(true);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "blue",
        //userSelect: "none"
      },
    },
  ];

  const retrieve_bucket = (value) => {
    setBucket(value);
    listObjectsOfBucket(value.bucket_name);
  };
  //

  return (
    <>
      <MDivHead style={{ margin: "1rem" }} />
      <h4>Available templates</h4>
      <DataTable
        columns={columns_template}
        data={templates}
        onRowClicked={rowTemplateClicked}
        highlightOnHover
        defaultSortField="name"
        pagination
        pointerOnHover={true}
        conditionalRowStyles={conditionalRowStyles}
      />
      {isTemplateSelected ? (
        <label>
          {" "}
          <b>Selected template:</b> {templateValue.name}
        </label>
      ) : null}
      <br />
      <br />

      <MDivInline>
        <h4>Set memory (GB)</h4>
        <MInput
          onChange={handleMemoryChange}
          type="number"
          placeholder="Type requested memory"
        />
      </MDivInline>
      <MDivInline>
        <h4>Set CPUs</h4>
        <MInput
          onChange={handleCPUChange}
          type="number"
          placeholder="Type requested cpu"
        />
      </MDivInline>
      <MDivInline>
        <h4>Set Time limit (hh:mm:ss)</h4>
        <MInput
          onChange={handleTimeChange}
          type="text"
          placeholder="Type requested timelimit"
        />
      </MDivInline>
      <MDivInline>
        <h4>Bucket</h4>
        <Combobox
          data={buckets}
          dataKey="id"
          textField="bucket_name"
          onChange={(value) => retrieve_bucket(value)}
        />
      </MDivInline>
      <MDivInline>
        <h4>Folder</h4>
        <Combobox
          data={foldernames}
          dataKey="id"
          textField="object_name"
          onChange={(value) => setFolderName(value)}
        />
      </MDivInline>
      <MDivInline>
        <h4>Job name</h4>
        <MInput
          onChange={handleJobnameChange}
          type="text"
          placeholder="Type job name"
        />
      </MDivInline>
      <MDivInline>
        <h4>Policy</h4>
        <Combobox
          data={policies}
          dataKey="id"
          textField="name"
          defaultValue="performance"
          onChange={(value) => setPolicy(value)}
        />
      </MDivInline>
      <MDivInline>
        <h4>Rank by</h4>
        <Combobox
          data={rankings}
          dataKey="id"
          textField="name"
          defaultValue="workload"
          onChange={(value) => setRank(value)}
        />
      </MDivInline>

      <div>
        <MDivLeft>
          <MButton onClick={callPredictIT}>
            <MContainer>
              <MLabel>
                <MIcon>
                  <img src={decision_mod_logo} alt="Logo/" width="25px" />
                </MIcon>
                Call Decision module
              </MLabel>
            </MContainer>
          </MButton>
        </MDivLeft>
        <MDivLeft>
          <MButton onClick={postSubmit} disabled={!isClusterSelected}>
            <MContainer>
              <MLabel>
                <MIcon>
                  <AiOutlineDoubleRight />
                </MIcon>
                Submit Workflow to {selectedCluster}
              </MLabel>
            </MContainer>
          </MButton>
        </MDivLeft>
        <br />
      </div>

      {isPredLoading ? <p>Fetching Decision Module results... </p> : null}
      {isSubmitLoading ? <p>Submitting the workflow...</p> : null}
      {isPredDone ? (
        <>
          <MDivT>
            <br />
            <h4>Available clusters</h4>
            <DataTable
              columns={columns_decision}
              data={predClusters}
              onRowClicked={rowDecisionClicked}
              highlightOnHover
              defaultSortFieldId="rank"
              pagination
              pointerOnHover={true}
              conditionalRowStyles={conditionalRowStyles}
            />
          </MDivT>
          <br />

          <br />
          <h4>Discarded clusters</h4>
          <DataTable
            columns={columns_disc}
            data={disClusters}
            highlightOnHover
            pagination
          />
        </>
      ) : null}
      {isSubmitted ? <Navigate to={`/workflows/${submitID}`}/> : null}
    </>
  );
};

export default NewJob;
