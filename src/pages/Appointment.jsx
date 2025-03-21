  import React, { useContext, useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { AppContext } from "../context/AppContext";
  import RelatedDoctors from "../Components/RelatedDoctors";
  import { assets } from "../assets/assets";
  import { toast } from "react-toastify";
  import axios from "axios";

  const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currentSymbol, backendUrl, token, getDoctorsData } =
      useContext(AppContext);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

    const navigate = useNavigate();
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const fetchDocInfo = async () => {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
    };
    console.log(docInfo)

    const getAvailableSlots = async () => {
      setDocSlots([]);
      let today = new Date();
    
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);
    
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
    
        let timeSlots = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1;
          let year = currentDate.getFullYear();
    
          const slotDate = `${day}_${month}_${year}`;
          const slotTime = formattedTime;
    
          // Check if the slot is available
          const isSlotAvailable =
            !docInfo.slots_booked[slotDate] || // No slots booked for this date
            !docInfo.slots_booked[slotDate].includes(slotTime); // Time slot not booked
    
          if (isSlotAvailable) {
            timeSlots.push({
              dateTime: new Date(currentDate),
              time: formattedTime,
            });
          }
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    };
    
    

    const bookAppointment = async () => {
      if (!token) {
        toast.warn("Login to book an appointment");
        return navigate("/login");
      }
      try {
        const date = docSlots[slotIndex][0].dateTime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        const { data } = await axios.post(
          `${backendUrl}/api/user/book-appointment`,
          { docId, slotDate, slotTime },
          { headers: { token } }
        );
        if (data.success) {
          toast.success(data.message);
          getDoctorsData();
          navigate("/my-appointments");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    useEffect(() => {
      fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
      if (docInfo) {
        getAvailableSlots();
      }
    }, [docInfo]);

    useEffect(() => {
      console.log(docSlots);
    }, [docSlots]);

    return (
      docInfo && (
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="bg-primary w-full h-80 object-cover rounded-lg border shadow-md"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="border rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mr-2">
                    {docInfo.name}
                  </h2>
                  <img
                    src={assets.verified_icon}
                    alt="Verified"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-lg text-gray-600">
                  {docInfo.degree} in {docInfo.speciality}
                </p>
                <button className="mt-2 text-sm text-gray-500 bg-gray-100 p-2 rounded-full border">
                  {docInfo.experience} years of experience
                </button>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xl font-medium text-gray-800 mb-2 flex gap-1">
                    About <img src={assets.info_icon} alt="" className="w-3" />
                  </p>
                  <p className="text-sm text-gray-600">{docInfo.about}</p>
                </div>
                <p className="text-gray-500 font-medium mt-4">
                  Appointment fee:{" "}
                  <span className="text-gray-600">
                    {currentSymbol}
                    {docInfo.fees}
                  </span>
                </p>
              </div>
              <div className="mt-6 p-6">
                <p className="text-lg font-medium text-gray-700">Booking Slots</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                  {docSlots.length > 0 &&
                    docSlots.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setSlotIndex(index)}
                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                          slotIndex === index
                            ? "bg-primary text-white"
                            : "border border-gray-200"
                        }`}
                      >
                        <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                        <p>{item[0] && item[0].dateTime.getDate()}</p>
                      </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                  {docSlots.length > 0 &&
                    docSlots[slotIndex]?.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => setSlotTime(item.time)}
                        className={`text-small font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                          slotTime === item.time
                            ? "bg-primary text-white"
                            : "text-gray-400 border border-gray-300"
                        }`}
                      >
                        {item.time}
                      </p>
                    ))}
                </div>
                <button
                  onClick={bookAppointment}
                  className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
                  aria-label="Book an Appointment"
                >
                  Book An Appointment
                </button>
              </div>
            </div>
          </div>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      )
    );
  };

  export default Appointment;
