import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeEditor from '@site/src/components/CodeEditor2';
import { Box,TextField,MenuItem } from '@mui/material';
import useGeoLocation from "react-ipgeolocation";
import { useColorMode } from '@docusaurus/theme-common';
import { EditorView } from '@codemirror/view';  
import { Blocks } from  'react-loader-spinner'
import useIsBrowser from '@docusaurus/useIsBrowser';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


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
import { height } from '@mui/system';

//Array of Languages on right side of code editor
const languages = [

  {
    id: "UR",
    code3: "urd",
    code2: "ur",
    name: "Urdu",
    i18nName: "اردو",
    direction: "rtl",
    fontFamily: "'Roboto Mono'",
    toEnglishDict: "'languages/ur/ur_native.lang.yaml'",
    fontWeights: "bold",
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
    fontFamily: "'Roboto Mono'",
    
    toEnglishDict: "'languages/hi/hi_native.lang.yaml'",
  },
  {
    id: "EN",
    code3: "eng",
    code2: "en",
    name: "English",
    i18nName: "English",
    fontFamily: "'Roboto Mono'",
    
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
    name: " Simple Hello World",
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

  const [loadingPyscript, setLoadingPyscript] = useState(true);

  useEffect(() => {
    console.log("loading pyscript...");
    let timeoutId;
    const clearTimeoutId = () => clearTimeout(timeoutId)
    document.addEventListener('py:ready', () => {
      clearTimeoutId()
      setLoadingPyscript(false)
    });
    timeoutId = setTimeout(() => {
      console.log("made loading false anyway after 10 seconds");
      setLoadingPyscript(false)
  }, 10000)
  }, [])

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
      title={`${siteConfig.title} | Programming for everyone`}
      description="Write Python in any human language. Can't find yours? Easily contribute.">
      <Head>
      {/* <!-- Recommended meta tags --> */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        {/* <!-- PyScript CSS --> */}
        <link rel="stylesheet" href="https://pyscript.net/releases/2024.1.1/core.css" />

        {/* <!-- This script tag bootstraps PyScript --> */}
        <script defer type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>

        {/* <!-- for splashscreen --> */}
        {/* <style> */}
            {/* #loading { outline: none; border: none; background: transparent } */}
        {/* </style> */}
        {/* <script type="module">
            const loading = document.getElementById('loading');
            addEventListener('py:ready', () => loading.close());
            loading.showModal();
        </script> */}

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

      <MaterialThemeWrapper>

      <HomepageHeader />
      <main>
        {/* <textarea  style={{
          fontFamily: "Hack, 'Courier New', monospaced"
        }}
        value={code}
        onChange={(e) => {
            setCode(e.target.value);
        }}></textarea> */}


                                             {/* *****************************************
                                             ********DIV FOR THE TOP SECTION**************
                                            ***********************************************
                                            *********************************************** */}

            <div style={{
              padding: "80px"
              
            }}>



  <Box width="250px">
  <TextField select fullWidth label="Choose Preset"  onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, initialCodes.find(l => l.id === e.target.value))
                  setCode(initialCodes.find(l => l.id === e.target.value).en);
                }}
                style={{
                  marginLeft: "0.7rem"
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
                        <MenuItem value={l.id}>{l.name}</MenuItem>
                      )
                    })
                  } 
                  <MenuItem value="custom">Custom</MenuItem>
   </TextField>
  </Box>
  
                                            {/* *****************************************
                                             ********DIV FOR THE LANGUAGE SECTION**********
                                            ***********************************************
                                            ************************************************/}
  
 
        <div style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "12px",
        }}>
            <div
              style={{
                flex: 1,
              }}>

              <Box width="250px">
                <TextField label="From" fullWidth select onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, languages.find(l => l.id === e.target.value))
                  setSourceLanguage(languages.find(l => l.id === e.target.value));
                }}
                style={{
                  marginLeft: "0.7rem"
                }}
                value={sourceLanguage?.id}
                >
                 {
                    languages.map((l, idx) => {
                      return (
                        <MenuItem value={l.id}>{l.name}</MenuItem>
                      )
                    })
                  }
                  
                </TextField>
              </Box>

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

    {/* IDE convertor button */}
  <button style={{
    opacity: 0.45,
     height:"100%",
     backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      width: "5%",
      fontSize: "1.5rem",  
  }} onClick={()=>{
    setTargetLanguage(sourceLanguage);
    setSourceLanguage(targetLanguage);
    var element = document.getElementById("python-code-editor2");
    setCode(element.innerHTML.replaceAll("<br>", "\n").replaceAll("&nbsp;", " "))
  }}>
  {/* &#8660; */}
  &#8644;
  </button>

            <div
              style={{
                flex: 1,
                marginLeft: "12px",
              }}>
  
  <Box width="250px">
    <TextField select label="To" fullWidth onChange={(e) => {
                  console.log("e.target.value:", e.target.value);
                  console.log(`languages.find(l => l.id === e.target.value)`, languages.find(l => l.id === e.target.value))
                  setTargetLanguage(languages.find(l => l.id === e.target.value));
                  setIsDetected(false);
                }}
                style={{
                  marginLeft: "0.7rem"
                }}
                value={targetLanguage?.id}
                 >
                {
                    languages.map((l, idx) => {
                      return (
                        <MenuItem value={l.id}>{l.name} {targetLanguage?.id === l.id ? isDetected ? " - detected" : "" : ""}</MenuItem>
                      )
                    })
                  }
    </TextField>
  </Box>

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
{!loadingPyscript && 
//  <div
//  dangerouslySetInnerHTML={{
//    __html: `
// <py-env>
// - universalpython
// - numpy
// </py-env>
// `,
//  }}
// /> */}

<py-script 
type="py"
id="output-terminal"
style={{
  fontFamily: "Hack, 'Courier New', monospaced",
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column-reverse",
  overflowY: "auto",  
  maxHeight: "300px",
  padding: "12px 18px 0px",
}} key={code+"_"+sourceLanguage.id+"_"+targetLanguage.id}>
  {`
from urdupython import (run_module, SCRIPTDIR);
from pyscript import document, display;
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
  {/* </span> */}
</py-script>}

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
      </MaterialThemeWrapper>

    </Layout>
  );
}


const MaterialThemeWrapper = ({children}) => {
  
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkTheme ? "dark" : "light",
        },
      }),
    [isDarkTheme],
  );
  
  return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
  </ThemeProvider>
}