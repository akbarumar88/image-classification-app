import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function About() {
  const [selectedImg, setSelectedImg] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [boundingBoxColor, setBoundingBoxColor] = useState("red");
  const [boundingBoxWidth, setBoundingBoxWidth] = useState("4");

  const getClassification = () => {
    const formData = new FormData();
    formData.append("sample", selectedImg);

    setLoading(true);
    axios
      .post(`${BASE_URL}/detect`, formData)
      .then(({ data: res }) => {
        // Berhasil Get Data6
        console.log("berhasil gan", res);
        setData(res);
      })
      .catch((e) => {
        console.log("Terjadi Kesalahan saat call API BossQue.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onColorPicked = (e) => {
    let val = e.target.value;
    setBoundingBoxColor(val);
  };

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img style={{}} src={imgPreview} />

        {data ? (
          <div
            className="absolute"
            style={{
              border: `solid ${boundingBoxWidth}px ${boundingBoxColor}`,
              position: "absolute",
              left: data.x1,
              top: data.y1,
              width: data.x2 - data.x1,
              height: data.y2 - data.y1,
            }}
          ></div>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          getClassification();
        }}
      >
        <div className="form-group">
          <label htmlFor="file-upload">Choose a file:</label>
          <input
            onChange={(e) => {
              // clear state Data
              setData(null);

              console.log("picture: ", e.target.files);
              setSelectedImg(e.target.files[0]);
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                console.log("reader onLoad gan");
                setImgPreview(reader.result);
              });

              console.log("reader read data gan");
              reader.readAsDataURL(e.target.files[0]);
            }}
            type="file"
            id="file-upload"
            name="file-upload"
          />
        </div>

        <div>
          <input
            onChange={onColorPicked}
            type="radio"
            name="color"
            id="red"
            value={"red"}
          />
          <label htmlFor="red"> Red</label>
        </div>

        <div>
          <input
            onChange={onColorPicked}
            type="radio"
            name="color"
            id="green"
            value={"green"}
          />
          <label htmlFor="green"> Green</label>
        </div>

        <div>
          <input
            onChange={onColorPicked}
            type="radio"
            name="color"
            id="blue"
            value={"blue"}
          />
          <label htmlFor="blue"> Blue</label>
        </div>

        <div class="slidecontainer">
          <input
            onChange={(e) => {
              // console.log("onchange slider gan");
              let val = e.target.value;
              setBoundingBoxWidth(`${val}`);
            }}
            type="range"
            min="4"
            max="12"
            class="slider"
            id="myRange"
          />
        </div>

        {loading ? <p>Loading...</p> : <></>}

        <div style={{ marginTop: 8 }}>
          <input type="submit" value="Classify" className="btn" />
        </div>
      </form>
    </div>
  );
}
