import '../../styles/Components/_main.scss';
import { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from '../../Context/InputSubmissonContext';
import { auth } from '../../Firebase';
import DisplayContent from './DisplayContent';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const { addSubmisson } = useInputContext();

  const [greeting, setGreeting] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 3 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 16) {
        setGreeting("Good Afternoon");
      } else if (currentHour >= 16 && currentHour < 19) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else {
        const displayName = user.displayName ?? user.email?.split("@")[0] ?? "User";
        setFirstName(displayName);
        setPhotoURL(user.photoURL);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const todayDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayKeyStore = days[todayDate.getDay()];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const todayDateStr = new Date().toISOString();
      addSubmisson(todayKeyStore, inputText.trim(),todayDateStr);
      setInputText('');
    }
  };

  return (
    <section>
      <div className="MainContent">
        <div>
          {firstName ? (
            <div className="greeting-wrapper">
              <h1>{greeting}, {firstName}!</h1>
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Profile"
                  width={60}
                  height={60}
                  style={{ borderRadius: "50%", marginLeft: "1rem" }}
                />
              )}
            </div>
          ) : (
            <h1>Welcome to Crextio</h1>
          )}
        </div>
        <p>Run your day or your day will run you</p>
        <div className="Dynamic-day">
          <p>{formattedDate}</p>
          <div className="Join-app">
            <p>Join video meetings with one tap</p>
            <span><a href="https://calendar.google.com/calendar/u/0/r?pli=1">Connect Google Calendar</a></span>
            <span><a href="#">Connect Outlook Calendar</a></span>
          </div>
        </div>
        <DisplayContent />
        <div className="InputTasks">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter task title"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">
              <FaArrowUp />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Main;
