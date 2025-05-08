import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Settings, Bell, Calendar, MapPin, Clock, Car, CreditCard, ChevronRight, LogOut } from "lucide-react"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    location: "New York, USA",
    joinDate: "January 2023",
    profileImage: "/placeholder.svg?height=100&width=100",
    recentRides: [
      { id: 1, from: "Home", to: "Office", date: "Today, 9:30 AM", price: "$12.50", status: "Completed" },
      { id: 2, from: "Office", to: "Restaurant", date: "Yesterday, 7:15 PM", price: "$8.75", status: "Completed" },
      { id: 3, from: "Airport", to: "Hotel", date: "May 5, 2:45 PM", price: "$34.20", status: "Completed" },
    ],
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen w-full bg-[#1E1E2D] text-white pt-16 pl-32">
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 rounded-full border-4 border-[#8A56E8] border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={fadeIn}>
          {/* Profile Header */}
          <motion.div className="bg-[#2A2A3C] rounded-xl p-6 mb-8 shadow-lg" variants={fadeIn}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#8A56E8]">
                  <img
                    src={userData.profileImage || "/placeholder.svg"}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#8A56E8] p-1 rounded-full">
                  <User size={16} />
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-[#B39DFF] mt-1">{userData.email}</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#B39DFF]" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#B39DFF]" />
                    <span className="text-sm">Member since {userData.joinDate}</span>
                  </div>
                </div>
              </div>

              <motion.div className="flex gap-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <button className="p-2 rounded-full bg-[#3F3F5A] hover:bg-[#8A56E8] transition-colors">
                  <Settings size={20} />
                </button>
                <button className="p-2 rounded-full bg-[#3F3F5A] hover:bg-[#8A56E8] transition-colors">
                  <Bell size={20} />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div className="flex overflow-x-auto mb-8 bg-[#2A2A3C] rounded-xl p-1" variants={fadeIn}>
            {["overview", "rides", "payment", "settings"].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${
                  activeTab === tab ? "bg-[#8A56E8] text-white" : "text-[#B39DFF] hover:bg-[#3F3F5A] transition-colors"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Cards */}
            <motion.div
              className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {[
                { icon: <Car className="text-[#8A56E8]" />, title: "Total Rides", value: "27" },
                { icon: <Clock className="text-[#8A56E8]" />, title: "Ride Time", value: "42h 15m" },
                { icon: <MapPin className="text-[#8A56E8]" />, title: "Distance", value: "345 km" },
                { icon: <CreditCard className="text-[#8A56E8]" />, title: "Spent", value: "$432.50" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-[#2A2A3C] p-6 rounded-xl shadow-lg"
                  variants={fadeIn}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(138, 86, 232, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1E1E2D] rounded-lg">{stat.icon}</div>
                    <div>
                      <p className="text-sm text-[#B39DFF]">{stat.title}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Rides */}
            <motion.div className="lg:col-span-2 bg-[#2A2A3C] rounded-xl p-6 shadow-lg" variants={fadeIn}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Rides</h2>
                <button className="text-sm text-[#B39DFF] hover:text-[#8A56E8] transition-colors">View All</button>
              </div>

              <motion.div className="space-y-4" variants={staggerContainer}>
                {userData.recentRides.map((ride) => (
                  <motion.div
                    key={ride.id}
                    className="bg-[#1E1E2D] p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    variants={fadeIn}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(63, 63, 90, 0.8)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="font-medium">
                          {ride.from} → {ride.to}
                        </p>
                      </div>
                      <p className="text-sm text-[#B39DFF] mt-1">{ride.date}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                      <span className="font-bold">{ride.price}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                        {ride.status}
                      </span>
                      <ChevronRight size={16} className="text-[#B39DFF]" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Card */}
            <motion.div className="bg-[#2A2A3C] rounded-xl p-6 shadow-lg" variants={fadeIn}>
              <h2 className="text-xl font-bold mb-6">Account</h2>

              <motion.div className="space-y-4" variants={staggerContainer}>
                {[
                  { icon: <User size={18} />, title: "Personal Information" },
                  { icon: <Settings size={18} />, title: "Preferences" },
                  { icon: <Bell size={18} />, title: "Notifications" },
                  { icon: <CreditCard size={18} />, title: "Payment Methods" },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#1E1E2D] hover:bg-[#3F3F5A] transition-colors"
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#3F3F5A]">{item.icon}</div>
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight size={16} className="text-[#B39DFF]" />
                  </motion.button>
                ))}

                <motion.button
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors mt-6"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <LogOut size={18} />
                    </div>
                    <span>Logout</span>
                  </div>
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Profile
