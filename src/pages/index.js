import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { Box, TextField, MenuItem } from '@mui/material';
import useGeoLocation from "react-ipgeolocation";
import { useColorMode } from '@docusaurus/theme-common';
import { EditorView } from '@codemirror/view';  
import { Blocks } from 'react-loader-spinner';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import styles from './index.module.css';
import CodeEditor from '@site/src/components/CodeEditor2';

// Constants
const LANGUAGES = [
  {
    id: "CS",
    code3: "ces",
    code2: "cs",
    name: "Czech",
    i18nName: "Čeština",
    fontFamily: "'Roboto Mono'",
    toEnglishDict: "'languages/cs/cs_native.lang.yaml'",
  },
  {
    id: "DE",
    code3: "deu",
    code2: "de",
    name: "German",
    i18nName: "Deutsch",
    fontFamily: "'Roboto Mono'",
    toEnglishDict: "'languages/de/de_native.lang.yaml'",
  },
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
];

const CODE_EXAMPLES = [
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
  print("Hello")
elif something == 2:
  print("World")
else:
  print("Didn't understand...")`
  },
  {
    id: "loop",
    name: "Loop",
    en: `things = ['💻', '📷', '🧸']

for thing in things:
  print(thing)`
  },
  {
    id: "file_io",
    name: "File Reading/Writing",
    en: `with open("chad.txt", "w") as f:
  f.write("chad")

with open("chad.txt", "r") as f:
  print(f.read())`
  }
];

// Components
const IDE = ({ basicSetup, sourceLanguage, ...props }) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <CodeEditor
      basicSetup={{
        ...{
          background: props.readOnly && !isDarkTheme ? "#000fff" : undefined,
        },
        ...basicSetup
      }}
      theme={isDarkTheme ? "dark" : props.readOnly ? EditorView.theme({ 
        '&': { backgroundColor: 'whitesmoke' } 
      }, { dark: false }) : "light"}
      {...props}
    />
  );
};

const LanguageSelector = ({ label, value, onChange, languages, isDetected }) => (
  <TextField 
    select 
    fullWidth 
    label={label}
    onChange={onChange}
    value={value}
    sx={{
      marginLeft: "0.7rem",
      maxWidth: { xs: "100%", md: "250px" }
    }}
  >
    {languages.map((language) => (
      <MenuItem key={language.id} value={language.id}>
        {language.name} {value === language.id && isDetected ? " - detected" : ""}
      </MenuItem>
    ))}
  </TextField>
);

const CodePresetSelector = ({ value, onChange, presets }) => (
  <Box width={{ xs: "100%", md: "250px" }}>
    <TextField 
      select 
      fullWidth 
      label="Choose Preset"
      onChange={onChange}
      value={value}
      sx={{ marginLeft: "0.7rem" }}
    >
      {presets.map((preset) => (
        <MenuItem key={preset.id} value={preset.id}>{preset.name}</MenuItem>
      ))}
      <MenuItem value="custom">Custom</MenuItem>
    </TextField>
  </Box>
);

const SwapButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    style={{
      opacity: 0.45,
      height: "100%",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      width: { xs: "10%", md: "5%" },
      fontSize: "1.5rem",
      margin: "0 8px"
    }}
  >
    &#8644;
  </button>
);

const OutputTerminal = ({ isWaitingForCode, code, sourceLanguage, targetLanguage, loadingPyscript }) => (
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
    }}>
      <Blocks
        visible={isWaitingForCode}
        height="14"
        width={isWaitingForCode ? "14" : "0"}
        ariaLabel="blocks-loading"
        wrapperStyle={{ paddingTop: "4px", transition: "0.2s" }}
        wrapperClass="blocks-wrapper"
      />
      {isWaitingForCode ? "Waiting for you to stop typing..." : "Output"}
    </div>
    
    {!loadingPyscript && (
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
        }} 
        key={`${code}_${sourceLanguage.id}_${targetLanguage.id}`}
      >
        {`
from universalpython import (run_module, SCRIPTDIR);
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
  element = document.getElementById("python-code-editor2");
  element.innerHTML = translated_code.replace("\\n", "<br/>").replace(" ", "&nbsp;")
        `}
      </py-script>
    )}
  </div>
);

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext();
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
};

const MaterialThemeWrapper = ({ children }) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  const theme = useMemo(
    () => createTheme({ palette: { mode: isDarkTheme ? "dark" : "light" } }),
    [isDarkTheme]
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Main Component
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [editorCode, setEditorCode] = useState(CODE_EXAMPLES[0].en);
  const [code, setCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isWaitingForCode, setIsWaitingForCode] = useState(false);
  const [isDetected, setIsDetected] = useState(false);
  const { country, isLoading: isCountryLoading } = useGeoLocation();
  const [sourceLanguage, setSourceLanguage] = useState(LANGUAGES.find(l => l.code2 === "en"));
  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES.find(l => l.default));
  const [loadingPyscript, setLoadingPyscript] = useState(true);
  const isBrowser = useIsBrowser();

  // Initialize PyScript
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingPyscript(false);
    }, 10000);
    
    document.addEventListener('py:ready', () => {
      clearTimeout(timeoutId);
      setLoadingPyscript(false);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  // Detect country language
  useEffect(() => {
    if (!country || targetLanguage?.default === false) return;

    fetch(`https://restcountries.com/v3.1/alpha/${country}?fullText=true`)
      .then(res => res.json())
      .then(result => {
        const languageCodes = LANGUAGES.map(language => language.code3);
        const countryFirstNativeLang = Object.keys(result[0].languages)
          .filter(lang => lang !== "eng")[0];

        const targetLanguageIndex = languageCodes.findIndex(
          lc => lc === countryFirstNativeLang
        );

        if (targetLanguageIndex > -1) {
          setTargetLanguage(LANGUAGES[targetLanguageIndex]);
          setIsDetected(true);
        } else {
          setTargetLanguage(LANGUAGES[1]);
        }
      })
      .catch(error => console.error("Error detecting country language:", error));
  }, [country]);

  // Detect browser language
  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const languageCode = userLang.split("-")[0];
    const targetLanguageIndex = LANGUAGES.findIndex(
      l => l.code2 === languageCode
    );

    if (languageCode !== "en" && targetLanguageIndex > -1) {
      setTargetLanguage(LANGUAGES[targetLanguageIndex]);
      setIsDetected(true);
    }
  }, []);

  // Debounce code changes
  useEffect(() => {
    setIsWaitingForCode(true);
    const timeoutId = setTimeout(() => {
      setIsWaitingForCode(false);
      setCode(editorCode);
    }, 400);

    return () => {
      setIsWaitingForCode(false);
      clearTimeout(timeoutId);
    };
  }, [editorCode]);

  const handleSwapLanguages = () => {
    setTargetLanguage(sourceLanguage);
    setSourceLanguage(targetLanguage);
    const element = document.getElementById("python-code-editor2");
    setCode(element.innerHTML.replaceAll("<br>", "\n").replaceAll("&nbsp;", " "));
  };

  return (
    <Layout
      title={`${siteConfig.title} | Programming for everyone`}
      description="Write Python in any human language. Can't find yours? Easily contribute."
    >
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="stylesheet" href="https://pyscript.net/releases/2024.1.1/core.css" />
        <script defer type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css" />
      </Head>

      <MaterialThemeWrapper>
        <HomepageHeader />
        <main>
          <Box sx={{ 
            padding: { xs: "20px", md: "80px" },
            maxWidth: "100%",
            overflowX: "hidden"
          }}>
            <CodePresetSelector
              value={CODE_EXAMPLES.find(c => c.en === code)?.id || "custom"}
              onChange={(e) => setCode(CODE_EXAMPLES.find(l => l.id === e.target.value).en)}
              presets={CODE_EXAMPLES}
            />

            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              marginTop: "12px",
              gap: { xs: "12px", md: "0" }
            }}>
              <Box sx={{ flex: 1 }}>
                <LanguageSelector
                  label="From"
                  value={sourceLanguage?.id}
                  onChange={(e) => setSourceLanguage(LANGUAGES.find(l => l.id === e.target.value))}
                  languages={LANGUAGES}
                  isDetected={false}
                />

                <IDE
                  id="python-code-editor1"
                  value={code}
                  mode="python"
                  onChange={text => setEditorCode(text)}
                  height="200px"
                  fontSize="1rem"
                  sourceLanguage={sourceLanguage}
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
              </Box>

              <SwapButton onClick={handleSwapLanguages} />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: "12px", md: "0" }
                }}>
                  <LanguageSelector
                    label="To"
                    value={targetLanguage?.id}
                    onChange={(e) => {
                      setTargetLanguage(LANGUAGES.find(l => l.id === e.target.value));
                      setIsDetected(false);
                    }}
                    languages={LANGUAGES}
                    isDetected={isDetected}
                  />

                  <Box sx={{ 
                    fontSize: "0.8rem",
                    fontFamily: "Roboto Mono, monospace",
                    fontWeight: "bold",
                    color: "gray",
                    marginLeft: { xs: "0", md: "18px" },
                    textAlign: { xs: "center", md: "left" },
                    padding: { xs: "0 12px", md: "0" }
                  }}>
                    Translation not looking right? Make edits{" "}
                    <a 
                      href={`https://github.com/UniversalPython/UniversalPython/edit/main/universalpython/${targetLanguage.toEnglishDict.replaceAll("'", '')}`} 
                      target='_blank'
                    >
                      here
                    </a>.
                  </Box>
                </Box>

                <IDE
                  id="python-code-editor2"
                  mode="python"
                  height="200px"
                  fontSize="1rem"
                  sourceLanguage={targetLanguage}
                  style={{
                    flex: "1 1 auto",
                    fontFamily: targetLanguage?.fontFamily || "Hack, 'Courier New', monospaced",
                    fontSize: "1.15rem",
                    direction: targetLanguage?.direction || "ltr",
                    margin: "12px",
                    borderRadius: "8px",
                    height: "200px",
                    overflow: "auto",
                    opacity: isWaitingForCode ? 0.5 : 0.97,
                    whiteSpace: "nowrap"
                  }}
                  readOnly={true}
                  disabled={true}
                  basicSetup={{ direction: targetLanguage?.direction || "ltr" }}
                />
              </Box>
            </Box>

            <OutputTerminal
              isWaitingForCode={isWaitingForCode}
              code={code}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              loadingPyscript={loadingPyscript}
            />
          </Box>
        </main>
      </MaterialThemeWrapper>
    </Layout>
  );
}