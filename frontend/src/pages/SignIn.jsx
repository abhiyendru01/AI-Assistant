import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from "axios"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { serverUrl, setUserData } = useContext(userDataContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErr("")

    try {
      const res = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password
      }, { withCredentials: true })

      setUserData(res.data)
      navigate("/")
    } catch (error) {
      console.error(error)
      setUserData(null)
      setErr(error?.response?.data?.message || "Invalid credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: `url(${bg})` }}>
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-[450px] bg-[#0d0d0dad] backdrop-blur-md rounded-2xl shadow-[0_0_50px_#00000088] p-8 text-white flex flex-col gap-6"
      >
        <h1 className="text-[28px] font-bold text-center mb-4">
          Welcome back to <span className="text-blue-500">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-[56px] bg-[#1a1a1a] border border-gray-600 rounded-full px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />

        <div className="relative w-full h-[56px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-full bg-[#1a1a1a] border border-gray-600 rounded-full px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-300 hover:text-blue-500"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>

        {err && (
          <p className="text-red-500 bg-[#1a1a1a99] px-4 py-2 rounded-md text-sm text-center">
            ⚠ {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full h-[56px] bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-full transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignIn
