"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const userKey = "@userData"
const APIURL = "https://vmcugroupapi-9b61193cdcaa.herokuapp.com";
const LOCALURL = "http://localhost:8800";
const LoginMain = () => {
    const initialState = {name:"", major:"", year:""};
    const [userData, setUserData] = useState(initialState);
    const { name, major, year } = userData;

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem(userKey)) router.push("/");
    }, []);

    const handleChangeInput = (e:any) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (userData.year == "not selected") {
            alert("please select");
        } else {
            try {
                await axios.post(`${APIURL}/login`, userData).then((response) => {
                 if (response.statusText == "OK") {
                    localStorage.setItem(userKey, JSON.stringify(response.data));
                    router.push("/");
                    
                 }
                })
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <main className="container main-content">
            <div className="single-box text-start p-sm-5 p-3">
                <div className="head-area mb-6">
                    <h6>Howdy! Please Register</h6>
                </div>
                <form onSubmit={handleSubmit} className="text-center d-grid gap-4">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="single-input text-start">
                                <label htmlFor="name">Name</label>
                                <div className="input-area second">
                                    <input type="text" placeholder="Type name" name="name" required onChange={handleChangeInput} value={name} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="single-input text-start">
                                <label htmlFor="year">Year</label>
                                <div className="second">
                                    <select id="year" name="year" onChange={handleChangeInput} value={year} >
                                        <option value="not selected">select</option>
                                        <option value="Freshman">Freshman</option>
                                        <option value="Sophomore">Sophomore</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Senior">Senior</option>
                                        <option value="More">More</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="single-input text-start">
                                <label htmlFor="major">Major</label>
                                <div className="input-area second">
                                    <input type="text" placeholder="Type name" name="major" required onChange={handleChangeInput} value={major} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                            <div className="btn-area text-end">
                                <button type={"submit"} className="cmn-btn">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default LoginMain;