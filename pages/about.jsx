import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Loading from "@/components/Loading"

const BASE_URL = "http://localhost:5000"

export default function About() {
  const [selectedImg, setSelectedImg] = useState("")
  const [imgPreview, setImgPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [boundingBoxColor, setBoundingBoxColor] = useState("red")
  const [boundingBoxWidth, setBoundingBoxWidth] = useState("4")

  useEffect(() => {
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

    return () => {}
  }, [])

  const validate = () => {
    if (!selectedImg) {
      alert("Anda belum memilih gambar yang akan diklasifikasikan!")
      return
    }

    getClassification()
  }

  const getClassification = () => {
    const formData = new FormData()
    formData.append("sample", selectedImg)

    setLoading(true)
    axios
      .post(`${BASE_URL}/detectbatik`, formData)
      .then(({ data: res }) => {
        if (res.status == 0) {
          alert("Terjadi kesalahan saat getClassification " + res.err)
          return
        }
        // Berhasil Get Data6
        console.log("berhasil gan", res)
        setData(res)
      })
      .catch((e) => {
        console.log("Terjadi Kesalahan saat call API BossQue.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onColorPicked = (e) => {
    let val = e.target.value
    setBoundingBoxColor(val)
  }

  const radioAndSlider = () => {
    return (
      <>
        <div>
          <input
            onChange={onColorPicked}
            checked={boundingBoxColor == "red"}
            type="radio"
            name="color"
            id="red"
            value={"red"}
            // checked={boundingBoxColor == "red"}
          />
          <label htmlFor="red"> Red</label>
        </div>

        <div>
          <input
            onChange={onColorPicked}
            checked={boundingBoxColor == "green"}
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
            checked={boundingBoxColor == "blue"}
            type="radio"
            name="color"
            id="blue"
            value={"blue"}
          />
          <label htmlFor="blue"> Blue</label>
        </div>

        {/* <div className="slidecontainer">
          <input
            onChange={(e) => {
              // console.log("onchange slider gan");
              let val = e.target.value
              setBoundingBoxWidth(`${val}`)
            }}
            type="range"
            min="4"
            max="8"
            className="slider"
            id="myRange"
          />
        </div> */}
      </>
    )
  }

  return (
    <div
      className="bg-yellow-100"
      style={{
        padding: 16,
      }}
    >
      {/* Form pilihan input radio */}
      <form
        onSubmit={(e) => {
          e.preventDefault()

          validate()
        }}
      >
        <div className="form-group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files.length == 0) {
                // user gak jadi memilih file
                return
              }
              // clear state Data
              setData(null)

              console.log("picture: ", e.target.files)
              setSelectedImg(e.target.files[0])
              const reader = new FileReader()
              reader.addEventListener("load", () => {
                console.log("reader onLoad gan")
                setImgPreview(reader.result)
              })

              console.log("reader read data gan")
              reader.readAsDataURL(e.target.files[0])
            }}
          />

          {/* <label htmlFor="file-upload">Choose a file:</label>
          <input
            onChange={(e) => {
              
            }}
            type="file"
            id="file-upload"
            name="file-upload"
          /> */}
        </div>

        {/* Preview Image */}
        <div
          style={{
            position: "relative",
            marginTop: 16,
          }}
        >
          {data ? (
            <>
              {/* <div
              className="absolute"
              style={{
                border: `solid ${boundingBoxWidth}px ${boundingBoxColor}`,
                position: "absolute",
                left: data.x1,
                top: data.y1,
                width: data.x2 - data.x1,
                height: data.y2 - data.y1,
              }}
            ></div> */}

              <p
                style={{
                  color: boundingBoxColor,
                  fontWeight: "bold",
                  fontSize: 32,
                  // position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                {data.label}
              </p>
            </>
          ) : null}

          <img style={{}} src={imgPreview} />
        </div>

        {/* {radioAndSlider()} */}

        {loading ? <Loading /> : <></>}

        <div style={{ marginTop: 8 }}>
          <input
            type="submit"
            value="Classify"
            className="btn cursor-pointer "
          />
        </div>
      </form>
    </div>
  )
}
