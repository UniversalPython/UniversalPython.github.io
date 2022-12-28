import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeEditor from '@site/src/components/CodeEditor2';



import useGeoLocation from "react-ipgeolocation";

import { useColorMode } from '@docusaurus/theme-common';


import { EditorView } from '@codemirror/view'; 
  
import { Blocks } from  'react-loader-spinner'

export const defaultLightThemeOption = EditorView.theme( 
  { 
    '&': { 
      backgroundColor: 'whitesmoke', 
    }, 
  }, 
  { 
    dark: false, 
  }, 
); 

// import "brace/mode/python";
// import "brace/theme/monokai";


import styles from './index.module.css';


const languages = [

  {
    id: "UR",
    code3: "urd",
    code2: "ur",
    name: "Urdu",
    i18nName: "اردو",
    direction: "rtl",
    style: {
      direction: "rtl"
    }
  },
  {
    id: "HI",
    default: true,
    code3: "hin",
    code2: "hi",
    name: "Hindi",
    i18nName: "Hindi",
  },
  {
    id: "EN",
    // default: true,
    code3: "eng",
    code2: "en",
    name: "English",
    i18nName: "English",
  }
]


const IDE = ({basicSetup, ...props}) => {

  const { isDarkTheme } = useColorMode();
  const [editorCode, setEditorCode] = useState(initialCodes[1].en);
  const [code, setCode] = useState(initialCodes[1].en);


  useEffect(() => {
    const codingTimeoutId = setTimeout(() => {
      setCode(editorCode);
    }, 400)
    return () => {
      clearTimeout(codingTimeoutId);
    }
  }, [editorCode]);

  return (<CodeEditor
    // id="python-code-editor1"
    // value={code}
    // mode="python"
    // // theme="monokai"
    // onChange={text => setEditorCode(text)}
    // // width={`${(window.innerWidth / 2)}px`}
    // // height={`${window.innerHeight}px`}
    // height={"200px"}
    // fontSize={"1rem"}
    // style={{
    //   flex: "1 1 auto",
    //   fontFamily: "Hack, 'Courier New', monospaced",
    //   fontSize: "1.15rem",
    //   margin: "12px",
    //   borderRadius: "8px",
    //   overflow: "hidden",
    // }}
    basicSetup={{
      ...{
      background: props.readOnly && !isDarkTheme ? "#000fff" : undefined,
      // direction: "rtl",
      // lineNumbers: true,
    },
    ...basicSetup
    }}
    theme={isDarkTheme ? "dark" : props.readOnly ? defaultLightThemeOption : "light"}
    {...props}
  />
)
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Tutorial - 5 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}


const initialCodes = [
  {
    id: "hello_world",
    name: "Simple Hello World",
    en: `display("Hello world!")`
  },
  {
    id: "conditionals",
    name: "If/Else",
    en: `
# Convert this file to Urdu code using the --reverse flag!

something = 2

if something == 1:
  display ("Hello")
elif something == 2:
  display ("World")
else:
  display ("Didn't understand...")`
  },
  {
    id: "loop",
    name: "Loop",
    en: `
things = ['💻', '📷', '🧸']

for thing in things:
  display(thing)
`
  },
{
  id: "file_io",
  name: "File Reading/Writing",
  en: `with open("chad.txt", "w") as f:
  f.write("chad")

with open("chad.txt", "r") as f:
  display(f.read())`
}
]


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  const [editorCode, setEditorCode] = useState(initialCodes[0].en);
  const [code, setCode] = useState("");
  const [isWaitingForCode, setIsWaitingForCode] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const {country, isLoading: isCountryLoading} = useGeoLocation();

  const [sourceLanguage, setSourceLanguage] = useState(languages.find(l => l.code2 === "en"))
  const [targetLanguage, setTargetLanguage] = useState(languages.find((l) => l.default));


  useEffect(() => {
    console.log(`targetLanguage: ${targetLanguage.id}`);
  },[targetLanguage]);

  useEffect(() => {
    if (targetLanguage && !targetLanguage.default) return;
    console.log("location: ", location)

    // References:
    // - https://www.npmjs.com/package/react-ipgeolocation
    // - https://restcountries.com/#api-endpoints-v3-full-name
    // - https://www.copycat.dev/blog/react-fetch/#:~:text=Fetch%20allows%20you%20to%20send,a%20full%2Dfledged%20React%20application.

    if (!country) return;
    fetch(`https://restcountries.com/v3.1/alpha/${country}?fullText=true`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log("result:", result);
        const languageCodes = languages.map((language) => language.code3);
        const countryFirstNativeLang = Object
          .keys(result[0].languages)
          .filter(lang => lang !== "eng") // remove english
          [0];
          console.log("countryFirstNativeLang:", countryFirstNativeLang)
          console.log("languageCodes:", languageCodes)

        const _targetLanguageIndex = languageCodes
        .findIndex(
          lc => lc === countryFirstNativeLang
        ) 
        let _targetLanguage;
        console.log("_targetLanguageIndex:", _targetLanguageIndex);
        if (_targetLanguageIndex > -1) {
          _targetLanguage = languages[_targetLanguageIndex];
          setIsDetected(true);
        } 
        else {
          _targetLanguage = languages[1];
        }
        setTargetLanguage(_targetLanguage);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        // this.setState({
        //   isLoaded: true,
        //   error
        // });
      }
    )
  }, [country]);

  useEffect(() => {
    setIsWaitingForCode(true);
    const codingTimeoutId = setTimeout(() => {
      setIsWaitingForCode(false);
      setCode(editorCode);
    }, 400)
    return () => {
      setIsWaitingForCode(false);
      clearTimeout(codingTimeoutId);
    }
  }, [editorCode]);

  useEffect(()=>{
    var userLang = navigator.language || navigator.userLanguage; 
    var _languageCode = userLang.split("-")[0];
    console.log ("The language is: " + userLang);
    const _targetLanguageIndex = languages.findIndex((l) => l.code2 === _languageCode);
    if (_languageCode !== "en" && _targetLanguageIndex > -1) {
      setTargetLanguage(languages[_targetLanguageIndex]);
      setIsDetected(true);
    }
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Head>
        <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
        <script defer src="https://pyscript.net/latest/pyscript.js"></script>

        {/* Add Hack font */}
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css" />

        {/* <div
  dangerouslySetInnerHTML={{
    __html: `<py-env>
- universalpython
- numpy
    </py-env>`,
  }}
/> */}


      </Head>
      <HomepageHeader />
      <main>
        {/* <textarea  style={{
          fontFamily: "Hack, 'Courier New', monospaced"
        }}
        value={code}
        onChange={(e) => {
            setCode(e.target.value);
        }}></textarea> */}



<div style={{
  padding: "80px"
}}>
  <select style={{
                  flex: 1,
                  // width: "100%",
              margin: "12px",

                }}
                
                onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, initialCodes.find(l => l.id === e.target.value))
                  setCode(initialCodes.find(l => l.id === e.target.value).en);
                }}
                value={initialCodes.find(c => {
                  console.log("c.en === code:", c.en === code);
                  return c.en === code
                })?.id || "custom"}
                key={code}
                >
                  {
                    initialCodes.map((l, idx) => {
                      return (
                        <option value={l.id}>{l.name}</option>
                      )
                    })
                  }
                  <option value="custom">Custom</option>
</select>
<div style={{
  display: "flex",
  flexDirection: "row",
}}>
  <div
              style={{
                flex: 1,
              }}>
   <select style={{
                  flex: 1,
                  // width: "100%",
              margin: "12px",

                }}
                
                onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, languages.find(l => l.id === e.target.value))
                  setSourceLanguage(languages.find(l => l.id === e.target.value));
                }}
                value={sourceLanguage?.id}
                >
                  {
                    languages.map((l, idx) => {
                      return (
                        <option value={l.id}>{l.name}</option>
                      )
                    })
                  }
</select>
<IDE id="python-code-editor1"
    value={code}
    mode="python"
    // theme="monokai"
    onChange={text => setEditorCode(text)}
    // width={`${(window.innerWidth / 2)}px`}
    // height={`${window.innerHeight}px`}
    height={"200px"}
    fontSize={"1rem"}
    style={{
      flex: "1 1 auto",
      fontFamily: "Hack, 'Courier New', monospaced",
      fontSize: "1.15rem",
      margin: "12px",
      borderRadius: "8px",
      overflow: "hidden",
    }}
    />
  </div>
  <div
              style={{
                flex: 1,
              }}>

                <select style={{
                  flex: 1,
                  // width: "100%",
              margin: "12px",

                }}
                
                onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, languages.find(l => l.id === e.target.value))
                  setTargetLanguage(languages.find(l => l.id === e.target.value));
                  setIsDetected(false);
                }}
                value={targetLanguage?.id}
                >
                  {
                    languages.map((l, idx) => {
                      return (
                        <option value={l.id}>{l.name} {targetLanguage?.id === l.id ? isDetected ? " - detected" : "" : ""}</option>
                      )
                    })
                  }
</select>
<IDE
            id="python-code-editor"
            value={code
              .replaceAll("display", "دکھاو")
              .replaceAll("things", "چیزیں")
              .replaceAll("thing", "چیز")
              .replaceAll("for", "ہر")
              .replaceAll("in", "اندر")
              .replaceAll(":", ":")            
            }
            mode="python"
            // theme="monokai"
            // onChange={text => setEditorCode(text)}
            // width={`${(window.innerWidth / 2)}px`}
            // height={`${window.innerHeight}px`}
            height={"200px"}
            fontSize={"1rem"}
            style={{
              flex: "1 1 auto",
              // background: "whitesmoke",
              fontFamily: "Hack, 'Courier New', monospaced",
              fontSize: "1.15rem",
              // textAlign: "right",
              direction: targetLanguage?.direction || "ltr",

              margin: "12px",
              borderRadius: "8px",
              overflow: "hidden",
              opacity: isWaitingForCode ? 0.5 : 0.97,
            }}
            readOnly={true}
            // background={'#000fff'}
            disabled={true}
            // theme={defaultLightThemeOption}
            direction="rtl"
            basicSetup={{
              // background: "#000fff",
              direction: "rtl",
              // lineNumbers: true,
            }}
            // theme={isDark ? "dark" : "light"}
            />
            </div>
</div>
          {/* {`
from datetime import datetime
now = datetime.now()
display(now.strftime("%m/%d/%Y, %H:%M:%S"))
`} */}
      <div style={{
          background: "#232323",
          border: "1px solid gray",
          padding: "0px 0px 24px",
          borderRadius: "8px",
          color: "whitesmoke",
          marginTop: "20px",
          overflow: "hidden",
          opacity: isWaitingForCode ? 0.76 : 1,
          pointerEvents: isWaitingForCode ? "none" : "auto",
          transition: "0.4s ease-in-out",
          // transitionDelay: "0.2s",
      }}>
        <div style={{
          textTransform: "uppercase",
          opacity: 0.67,
          fontSize: "0.8rem",
          letterSpacing: "0.1rem",
          padding: "12px 24px",
          height: "44px",
          marginBottom: "12px",
          background: "black",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}> <Blocks
        visible={isWaitingForCode}
        height="14"
        width={isWaitingForCode ? "14" : "0"}
        ariaLabel="blocks-loading"
        wrapperStyle={{
          paddingTop: "4px",
          transition: "0.2s",
        }}
        wrapperClass="blocks-wrapper"
      /> {isWaitingForCode ? "Waiting for you to stop typing..." : "Output"}</div>
        <div style={{
        }}>
  
<py-config>{`
packages = ["numpy", "https://files.pythonhosted.org/packages/b5/92/6d72a08c7b700031f9062c8f1c2f303ec2350eb83cca304ed28d035eed9c/universalpython-0.0.3-py3-none-any.whl"]
`}</py-config>

{/* <div
  dangerouslySetInnerHTML={{
    __html: `<py-env>
- universalpython
    </py-env>`,
  }}
/> */}
{/* <py-config>{`
packages = [
  "./static/wheels/universalpython-0.0.3-py3-none-any.whl",
]
terminal = false
`}
    </py-config> */}


{/* <py-config>{`
packages = [
  "./static/wheels/universalpython-0.0.3.tar.gz",
]`}
    </py-config> */}

{/* <py-env>{`- universalpython`}</py-env> */}
        <py-script style={{
          fontFamily: "Hack, 'Courier New', monospaced",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",  
          maxHeight: "300px",
          padding: "12px 18px 0px",
        }} key={code}>
{code.toString()}
        </py-script>
          </div>

        </div>
        </div>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
