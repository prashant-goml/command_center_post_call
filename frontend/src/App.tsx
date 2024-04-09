import React, { useEffect, useState } from "react";
import "./App.css";
import { AppLayout, TopNavigation } from "@awsui/components-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import logo from "./ico_connect.svg";
import Authentication from "./components/Authentication/Authentication";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import { Auth } from "@aws-amplify/auth";
import Logout from "./components/Logout/Logout";
import Survey from "./components/Survey/Survey";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [utilities, setUtilities] = useState<any[]>([]);

    var appConfiguration: any = (window as any).app_configuration;

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         setUtilities([
    //             { type: "button", text: "Logout", href: "/logout", external: false },
    //         ]);
    //     } else {
    //         setUtilities([]);
    //     }
    // }, [isAuthenticated]);

    // Auth.configure({
    //     Auth: {
    //         userPoolId: appConfiguration.cognito_pool_id,
    //         userPoolWebClientId: appConfiguration.cognito_client_id,
    //     },
    // });

    const authenticated = (value: boolean) => {
        setIsAuthenticated(value);
    };

    return (
        <div className="App">
            <AppLayout
                navigationHide={true}
                toolsHide={true}
                content={
                    <div>
                        <div className="navigation-container">
                            <TopNavigation
                                utilities={utilities}
                                identity={{
                                    href: "/",
                                    // title: "Contact Surveys for Amazon Connect",
                                    // logo: {
                                    //     src: logo,
                                    // },
                                }}
                                i18nStrings={{
                                    searchIconAriaLabel: "Search",
                                    searchDismissIconAriaLabel: "Close search",
                                    overflowMenuTriggerText: "More",
                                    overflowMenuTitleText: "More",
                                    overflowMenuBackIconAriaLabel: "Back",
                                    overflowMenuDismissIconAriaLabel: "Close menu",
                                }}
                            />
                        </div>
                        <Router>
                            <Routes>
                                <Route path="/" element={<Home authenticated={authenticated}></Home>}></Route>
                                <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                                <Route path="/login" element={<Authentication></Authentication>}></Route>
                                <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
                                <Route path="/logout" element={<Logout></Logout>}></Route>
                                <Route path="/*" element={<Navigate to={"/"}></Navigate>}></Route>
                            </Routes>
                        </Router>
                    </div>
                }
            />
        </div>
    );
}

// function App() {
//     return (
//       <>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
//           <Route path="/survey" element={<Survey editable={true} setEditable={(value: boolean) =>{}} survey={{surveyId:'defff',
//     surveyName:'Survey1',
//     max: 5,
//     min: 0,
//     introPrompt: "Answer questions",
//     outroPrompt: "Thanks",
//     questions: ['Rate the interaction'],
//     flags: [0]}}/>}></Route>
//           <Route path="/logout" element={<Logout/>}></Route>
//         </Routes>
//       </>
//     );
//   }


{/* <Router>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                                <Route path="/survey" element={<Survey editable={true} setEditable={(value: boolean) =>{}} survey={{surveyId:'', surveyName:'',
                                                max: 5,
                                                min: 0,
                                                introPrompt: "",
                                                outroPrompt: "",
                                                questions: [],
                                                flags: []}}/>}></Route>
                                <Route path="/login" element={<Authentication></Authentication>}></Route>
                                <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
                                <Route path="/logout" element={<Logout></Logout>}></Route>
                                <Route path="/*" element={<Navigate to={"/"}></Navigate>}></Route>
                            </Routes>
                        </Router> */}
  
  export default App;
