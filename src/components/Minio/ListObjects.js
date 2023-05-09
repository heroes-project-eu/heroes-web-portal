import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MTable, MHead, MTh, MTd, MBody, MDiv, MIcon, MButtonBlue,
  MButton, MDivHead, MContainer, MLabel, MDivRight, MDivLeft,
  MInputFile, 
  MButtonRed} from "./styles";
import format from "date-fns/format";
import { AiOutlineCloudDownload, AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import prettyBytes from "pretty-bytes";
import axios from "axios";

const ListObjects = () => {
  const inputRef = (useRef < HTMLInputElement) | (null > null);

  const {bucketName} = useParams();
  const {obj_name} = useParams();
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState();
  const [prefix, setPrefix] = useState("");

  const ENDPOINT = "https://api.heroes-project.eu";
  const jwt = window.sessionStorage.getItem("jwt");

  const clearObjects = () => {
    setObjects([]);
  };

  // Get bucket content
  const listObjectsOfBucket = async () => {
    let url
    console.log(obj_name, "obj name")
    if (typeof obj_name === "undefined") {
      url = `${ENDPOINT}/organization/data/bucket/${bucketName}/list?bucket_recursive=false`
    } else {
      url = `${ENDPOINT}/organization/data/bucket/${bucketName}/list?bucket_recursive=false&bucket_prefix=${obj_name}%2F`
    }
    console.log(url, "url")
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
      .then((objects) => {
        setObjects(objects);
        setIsLoading(false);
      });
  };

  // Get bucket content from specific folder
  const listObjectsOfBucketFolder = async (folder) => {
    setPrefix(folder)
    console.log("prefix buckets folder", prefix)
    let url = `${ENDPOINT}/organization/data/bucket/${bucketName}/list?bucket_recursive=false&bucket_prefix=${folder}`
    console.log(url, "url folder")
    console.log(folder, "folder")
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
      .then((objects) => {
        setObjects(objects);
        setIsLoading(false);
      });
  };
  // Data Download
  const getBucketFile = async (object_name) => {
    fetch(
      `${ENDPOINT}/organization/data/download?bucket=${bucketName}&file=${object_name}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: `${jwt}`,
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        var file = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = file;
        a.download = object_name.split(/[/, ]+/).pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  // Data Upload
  const handleFile = (e) => {
    let file_to_upload = e.target.files[0];
    setFile(file_to_upload);
  };

  const handleUpload = (e) => {
    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", file.name);
    let url = `${ENDPOINT}/organization/data/upload?bucket=${bucketName}&bucket_prefix=${prefix.slice(0,-1)}`
    console.log("upload url", url)
    axios({
      url: url,
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        token: `${jwt}`,
      },
      data: formdata,
    }).then((res) => {
      console.log("upload result",res);
      clearObjects();
      listObjectsOfBucketFolder(prefix);
    });
  };


  // Remove file
  const deleteObject = (object_name) => {
    axios({
      url: `${ENDPOINT}/organization/data/bucket/${bucketName}?object_path=${object_name}`,
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        token: `${jwt}`,
      },
    }).then((res) => {
      console.log(res);
      clearObjects();
      listObjectsOfBucket();
    });
  }

  // Load
  useEffect(() => {
    clearObjects();
    listObjectsOfBucketFolder(prefix);
    // DO NOT DELETE BELOW LINE, IT FIXES A WARNING
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketName]);

  return (
    <MDiv>
      <MDivHead>
        <MDivLeft>
          <h1>List of objects in {bucketName}</h1>
          <Link to="/data">Back to buckets</Link>
        </MDivLeft>
        <MDivRight>
          <MContainer>
            <MInputFile
              type="file"
              name="file"
              onChange={(e) => handleFile(e)}
            />
            <MButton onClick={handleUpload}>
              <>
                <MLabel>
                  <MIcon>
                    <AiOutlineCloudUpload />
                  </MIcon>
                  Upload a file
                </MLabel>
              </>
            </MButton>
          </MContainer>
        </MDivRight>
      </MDivHead>
      <MTable>
        <MHead>
          <tr>
            <MTh>Name</MTh>
            <MTh>Size</MTh>
            <MTh>Last Modified</MTh>
            <MTh>Download</MTh>
            <MTh>Remove</MTh>
          </tr>
        </MHead>
        <MBody>
          {objects.map((obj) => {
            return (
              <tr key={obj.object_name}>
                { obj.is_dir ?       
                <MTd
                onClick={() => listObjectsOfBucketFolder(obj.object_name)} >{obj.object_name.replace(prefix,"")}  
                </MTd>
                :
                  <MTd>{obj.object_name.replace(prefix, "")}</MTd>
                }
                <MTd>
                  {obj.is_dir ? "" :
                  prettyBytes(obj.size)
                  }
                </MTd>
                {/*<MTd>{obj.metadata["content-type"]}</MTd>*/}
                {/* <MTd>{format(obj.lastModified, "dd MMM yyyy   hh:mm a")}</MTd> */}
                <MTd>{obj.last_modified}</MTd>
                <MTd>
                  {obj.is_dir ? "" :
                  <MButtonBlue
                    onClick={() => {
                      getBucketFile(obj.object_name);
                    }}
                  >
                    <MIcon>
                      <AiOutlineCloudDownload />
                    </MIcon>
                  </MButtonBlue>
                }
                </MTd>
                 <MTd>
                  <MButtonRed
                    onClick={() => {
                        deleteObject(obj.object_name);
                      }}>
                      {
                        <MIcon>
                          <AiOutlineDelete />
                        </MIcon>
                      }
                    </MButtonRed>
                </MTd> 
              </tr>
            );
          })}
        </MBody>
      </MTable>
      {/* I'd tried to put it before the table but I is not correctly placed */}
      {isLoading ? <p> Loading ... </p> : null}
    </MDiv>
  );
};

export default ListObjects