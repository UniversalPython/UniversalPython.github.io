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

import useIsBrowser from '@docusaurus/useIsBrowser';


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
    fontFamily: "'Kawkab Mono'",
    toEnglishDict: "'languages/ur/ur_native.lang.yaml'",
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
    fontFamily: "'Hack', 'Courier New', monospaced",
    toEnglishDict: "'languages/hi/hi_native.lang.yaml'",
  },
  {
    id: "EN",
    // default: true,
    code3: "eng",
    code2: "en",
    name: "English",
    i18nName: "English",
    fontFamily: "'Hack', 'Courier New', monospaced",
  }
]


const IDE = ({basicSetup, ...props}) => {

  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";
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
    en: `print("Hello world!")`
  },
  {
    id: "conditionals",
    name: "If/Else",
    en: `something = 2

if something == 1:
  print ("Hello")
elif something == 2:
  print ("World")
else:
  print ("Didn't understand...")`
  },
  {
    id: "loop",
    name: "Loop",
    en: `things = ['💻', '📷', '🧸']

for thing in things:
  print(thing)
`
  },
{
  id: "file_io",
  name: "File Reading/Writing",
  en: `with open("chad.txt", "w") as f:
  f.write("chad")

with open("chad.txt", "r") as f:
  print(f.read())`
}
]


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  const [editorCode, setEditorCode] = useState(initialCodes[0].en);
  const [code, setCode] = useState("");
  
  const [outputCode, setOutputCode] = useState("");
  
  const [isWaitingForCode, setIsWaitingForCode] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const {country, isLoading: isCountryLoading} = useGeoLocation();

  const [sourceLanguage, setSourceLanguage] = useState(languages.find(l => l.code2 === "en"))
  const [targetLanguage, setTargetLanguage] = useState(languages.find((l) => l.default));


  const isBrowser = useIsBrowser();

  const dummyOutputTerminal = isBrowser && document.getElementById("dummy-output-terminal");

  useEffect(() => {
    if (!dummyOutputTerminal) return;
    
    dummyOutputTerminal.addEventListener("change", (e) => {
      console.log("e.target.value", e.target.value);
      setOutputCode(e.target.value);
    })
    // console.log("dummyOutputTerminal:", dummyOutputTerminal.innerHTML)
    // setTimeout(() => setOutputCode(document.getElementById("dummy-output-terminal").innerHTML), 400);
  })

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
    // https://stackoverflow.com/questions/8199760/how-to-get-the-browser-language-using-javascript
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
      fontFamily: sourceLanguage?.fontFamily || "Hack, 'Courier New', monospaced",
      fontSize: "1.15rem",
      margin: "12px",
      borderRadius: "8px",
      overflow: "hidden",
      direction: sourceLanguage?.direction || "ltr",

    }}
    />
  </div>

  <button style={{
    opacity: 0.45
  }} onClick={()=>{
    setTargetLanguage(sourceLanguage);
    setSourceLanguage(targetLanguage);
    var element = document.getElementById("python-code-editor2");
    setCode(element.innerHTML.replaceAll("<br>", "\n").replaceAll("&nbsp;", " "))
  }}>
  &#8660;
  </button>

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
            id="python-code-editor2"
            // value={code
            //   .replaceAll("display", "دکھاو")
            //   .replaceAll("things", "چیزیں")
            //   .replaceAll("thing", "چیز")
            //   .replaceAll("for", "ہر")
            //   .replaceAll("in", "اندر")
            //   .replaceAll(":", ":")            
            // }
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
              fontFamily: targetLanguage?.fontFamily || undefined,
              margin: "12px",
              borderRadius: "8px",
              height: "200px",
              overflow: "auto",
              // height: "100%",
              opacity: isWaitingForCode ? 0.5 : 0.97,
              whiteSpace: "nowrap"
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
        <py-script 
        id="output-terminal"
        style={{
          fontFamily: "Hack, 'Courier New', monospaced",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",  
          maxHeight: "300px",
          padding: "12px 18px 0px",
        }} key={code+"_"+sourceLanguage.id+"_"+targetLanguage.id}>
{`
from urdupython import (run_module, SCRIPTDIR);
from js import document;
import os;
import sys;

original_code = """${code.toString()}""";
with open('file', 'w') as sys.stdout:
  english_code = ${sourceLanguage.id === "EN" ? `original_code;` : `run_module(
    mode="lex", 
    code=original_code,
    args={
              'translate': True,
              'dictionary': os.path.join(SCRIPTDIR, ${sourceLanguage.toEnglishDict}),
              'reverse': False,
              'keep': False,         
              'keep_only': False,
              'return': True,
    }
  );`}
  # display(english_code);
  print = display;
  exec(english_code);
  
  translated_code = ${targetLanguage.id === "EN" ? `english_code;` : `run_module(
    mode="lex", 
    code=english_code,
    args={
              'translate': True,
              'dictionary': os.path.join(SCRIPTDIR, ${targetLanguage.toEnglishDict}),
              'reverse': True,
              'keep': False,         
              'keep_only': False,
              'return': True,
    }
  );`}
  # display(translated_code)
  # code = code.replace("print", "display");
  element = document.getElementById("python-code-editor2");
  # display(element.innerHTML)
  element.innerHTML = translated_code.replace("\\n", "<br/>").replace(" ", "&nbsp;")
  # .replace(" ", "&nbsp;");

  `
  
  }
        </py-script>

        {/* <input id="dummy-output-terminal" /> */}
        {/* 


        <py-script key={code}>{`
from urdupython import (run_module, SCRIPTDIR);
import os;
import sys;
with open('file', 'w') as sys.stdout:
  code = run_module(
    mode="lex", 
    code="""${code.toString()}""",
    args={
              'translate': False,
              'dictionary': os.path.join(SCRIPTDIR, 'languages/ur/ur_native.lang.yaml'),
              'reverse': False,
              'keep': False,         
              'keep_only': False,
              'return': True,
    }
  );
  display(code);
  eval(code);
#  element = document.getElementById("dummy-output-terminal");
 # element.value = code;
`
}
        </py-script> */}
          </div>

        </div>
        </div>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
