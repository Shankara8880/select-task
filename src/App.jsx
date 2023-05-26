import React, { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
  const [arr, setArr] = useState([{}])
  const [option, setOption] = useState(["selected"])
  const [selectedArg, setSelectedArg] = useState([""])
  const [result, setResult] = useState()
  const [andResult, setAndResult] = useState({ and1: true, and2: true })
  const [orResult, setOrResult] = useState({ and1: true, and2: true })


  useEffect(() => {
    const copy = { ...orResult }
    setResult(!!(copy.and1 || copy.and2))
  }, [orResult])

  useEffect(() => {
    const copy = { ...andResult }
    setResult(!!(copy.and1 && copy.and2))
  }, [andResult])


  return <>
    {
      arr.map((item, i) => <div>
        <input type="text" onChange={e => {
          const copy = [...arr]
          copy[i] = { [e.target.value]: true }
          setArr(copy)
        }} />
        <select
          onChange={e => {
            const copy = [...arr]
            copy[i][Object.keys(copy[i])[0]] = !!e.target.value
            setArr(copy)
            if ((selectedArg[0] === [Object.keys(arr[i])[0]][0])) {
              setResult(!!e.target.value)
            }
          }}
        >
          <option value={true}>True</option>
          <option value={""}>False</option>
        </select>
        <br />
      </div >)
    }
    <button
      onClick={e => setArr([...arr, {}])} type="button" >+Add Arg</button>
    <br />
    <br />
    {
      option.map((item, i) => <div>
        {
          item == "contant" ? <>
            <select
              onChange={e => setResult(!!e.target.value)} >
              <option value={true}>True</option>
              <option value={""}>False</option>
            </select>
          </>
            :
            item == "argument" ? <>
              <select
                onChange={e => {
                  const copy = [...arr]
                  setArr(copy)
                  setSelectedArg([Object.keys(arr[e.target.selectedIndex])[i]])
                  setResult(!!e.target.value)
                }}
              >
                {
                  arr.map((item, i) => <option value={arr[i][Object.keys(arr[i])[0]] ? true : ""}>{[Object.keys(arr[i])[0]]}</option>)
                }

              </select>
            </>
              :
              item == "and" ? <>
                <br />
                <select >
                  <option value={true}>and</option>
                </select>
                <br />
                <br />
                <select
                  className='ms-3'
                  onChange={e => {
                    setAndResult({ ...andResult, and1: !!e.target.value })
                    setSelectedArg([Object.keys(arr[e.target.selectedIndex])[i]])

                  }}
                >
                  {
                    arr.map((item, i) => <option value={arr[i][Object.keys(arr[i])[0]] ? arr[i][Object.keys(arr[i])[0]] : ""}>{[Object.keys(arr[i])[0]]}</option>)
                  }

                </select>
                <br />
                <select
                  className='ms-3'
                  onChange={e => {
                    setAndResult({ ...andResult, and2: !!e.target.value })
                    setSelectedArg([Object.keys(arr[e.target.selectedIndex])[i]])
                  }}

                >
                  {
                    arr.map((item, i) => <option value={arr[i][Object.keys(arr[i])[0]] ? arr[i][Object.keys(arr[i])[0]] : ""}>{[Object.keys(arr[i])[0]]}</option>)
                  }

                </select>

              </>
                :
                item == "or" ? <>
                  <br />
                  <select >
                    <option value={true}>or</option>
                  </select>
                  <br />
                  <br />

                  <select
                    className='ms-3'
                    onChange={e => {
                      setOrResult({ ...orResult, and1: !!e.target.value })
                      setSelectedArg([Object.keys(arr[e.target.selectedIndex])[i]])
                    }}
                  >
                    {
                      arr.map((item, i) => <option value={arr[i][Object.keys(arr[i])[0]] ? arr[i][Object.keys(arr[i])[0]] : ""}>{[Object.keys(arr[i])[0]]}</option>)
                    }

                  </select>
                  <br />
                  <select
                    className='ms-3'
                    onChange={e => {
                      setOrResult({ ...orResult, and2: !!e.target.value })
                      setSelectedArg([Object.keys(arr[e.target.selectedIndex])[i]])
                    }}

                  >
                    {
                      arr.map((item, i) => <option value={arr[i][Object.keys(arr[i])[0]] ? arr[i][Object.keys(arr[i])[0]] : ""}>{[Object.keys(arr[i])[0]]}</option>)
                    }

                  </select>
                </>
                  : <select
                    onChange={e => {
                      e.target.value == "contant" && setResult(true)
                      const copy = [...option]
                      e.target.value == "argument" && setResult(arr[0][Object.keys(arr[0])[0]])
                      copy[i] = e.target.value
                      setOption(copy)

                    }}
                  >
                    <option selected disabled>select</option>
                    <option value="contant">contant</option>
                    <option value="argument">argument</option>
                    <option value="and">and</option>
                    <option value="or">or</option>
                  </select>
        }

        <button
          onClick={e => {
            console.log(option, "bfore splic")
            option.splice(i, 1)
            console.log(option.length === 0, "length")
            option.length === 0 ? setOption(["selected"]) : setOption([...option])
            console.log(option, "after splic")
          }}
          type="button" >X</button>
      </div >
      )
    }
    {
      (option[0] === "or" || option[0] === "and") && < button
        onClick={e => setOption([...option, "selected"])}
        type="button" >Add Option
      </button >
    }
    <h1>Result :  {arr.length > 1 ? (result ? "true" : "false") : "undefine"}</h1>
  </>
}

export default App