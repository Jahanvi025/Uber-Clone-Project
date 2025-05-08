import { useState, useEffect } from "react"
import { Globe, Menu, X, User, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const navigate = useNavigate();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
  ]

  const changeLanguage = (e) => {
    setSelectedLanguage(e.target.value)
  }

  const handleClick = (value) => {
    if (value === "login") {
      // navigate to login
      navigate("/userlogin")
    } else if (value === "signup") {
      // navigate to signup
      navigate("/usersignup")
    }
    else if (value === "profile") {
      // navigate to profile
      navigate("/profile")
    }
  }

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-16 bg-transparent backdrop-blur-sm flex items-center justify-between z-10 font-sans px-4 md:pl-36 md:pr-5"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white text-lg font-sans">Dashboard</h1>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4 justify-center">
        <motion.div
          className="bg-white/50 backdrop-blur border border-white/25 rounded-2xl px-1 py-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Globe color="black" size={20} />
            <select
              className="bg-transparent text-black outline-none font-sans"
              onChange={changeLanguage}
              value={selectedLanguage}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 rounded-full bg-[#3F3F5A] hover:bg-[#8A56E8] transition-colors"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Bell size={20} className="text-white" />
            </motion.button>
            <motion.button onClick={() => handleClick("profile")}
              className="p-2 rounded-full bg-[#8A56E8] text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <User size={20} />
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-white/50 backdrop-blur border border-white/25 rounded-2xl">
            <motion.button
              onClick={() => handleClick("login")}
              className="bg-neutral-950 text-white px-4 py-2 rounded-2xl font-sans"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => handleClick("signup")}
              className="text-black px-4 py-2 rounded-md font-sans"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Signup
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-[#1E1E2D] border-t border-[#3F3F5A] p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-4">
              <div className="bg-[#2A2A3C] rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <Globe color="white" size={20} />
                  <select
                    className="bg-transparent text-white outline-none font-sans w-full"
                    onChange={changeLanguage}
                    value={selectedLanguage}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="flex gap-2">
                  <button onClick={()=> handleClick("profile")} className="flex items-center gap-2 bg-[#2A2A3C] text-white px-4 py-2 rounded-xl w-full">
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center gap-2 bg-[#2A2A3C] text-white px-4 py-2 rounded-xl w-full">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleClick("login")}
                    className="bg-[#8A56E8] text-white px-4 py-2 rounded-xl font-sans"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleClick("signup")}
                    className="bg-[#2A2A3C] text-white px-4 py-2 rounded-xl font-sans"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar
