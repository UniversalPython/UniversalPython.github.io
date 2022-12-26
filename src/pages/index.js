import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeEditor from '@site/src/components/CodeEditor2';

import { useColorMode } from '@docusaurus/theme-common';


import { EditorView } from '@codemirror/view'; 
  
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
    name: "Urdu",
    i18nName: "اردو",
    countries: [
      "PK",
    ],
    direction: "rtl",
    style: {
      direction: "rtl"
    }
  },
  {
    id: "HI",
    name: "Hindi",
    i18nName: "Hindi",
    countries: [
      "IN",
    ],
  }
]


const IDE = ({basicSetup, ...props}) => {

  const { isDarkTheme } = useColorMode();
  const [editorCode, setEditorCode] = useState(initialCodes[1].en);
  const [code, setCode] = useState(initialCodes[1].en);


  useEffect(() => {
    const codingTimeoutId = setTimeout(() => setCode(editorCode), 400)
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
    en: `display("Hello world!")`
  },
  {
    en: `
things = ['💻', '📷', '🧸']

for thing in things:
  display(thing)
`
  },
  {
    en: `
# Convert this file to Urdu code using the --reverse flag!

something = 2

if something == 1:
  display ("Hello")
elif something == 2:
  display ("World")
else:
  display ("Didn't understand...")`
  }

]


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  const [editorCode, setEditorCode] = useState(initialCodes[2].en);
  const [code, setCode] = useState(initialCodes[2].en);


  useEffect(() => {
    const codingTimeoutId = setTimeout(() => setCode(editorCode), 400)
    return () => {
      clearTimeout(codingTimeoutId);
    }
  }, [editorCode]);



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

}}>
  <option>English</option>
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

                }}>
  <option>Urdu - detected</option>
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
              direction: "rtl",

              margin: "12px",
              borderRadius: "8px",
              overflow: "hidden",
              opacity: 0.97

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
      }}>
        <div style={{
          textTransform: "uppercase",
          opacity: 0.67,
          fontSize: "0.8rem",
          letterSpacing: "0.1rem",
          padding: "12px 24px",
          marginBottom: "12px",
          background: "black",
        }}>Output</div>
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
