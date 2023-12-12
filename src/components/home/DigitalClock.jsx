import { useEffect, useState } from "react";
import { IoMdClock } from "react-icons/io";

const DigitalClock = () => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  const updateClock = () => {
    const date = new Date();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const am_pm = date.getHours() >= 12 ? "PM" : "AM";

    const year = date.getFullYear();
    const month = meses[date.getMonth()];
    const day = date.getDate();

    const newTimeString = `${hour}:${minute}:${second} ${am_pm}`;
    const newDateString = `${day} de ${month} de ${year}`;

    setTimeString(newTimeString);
    setDateString(newDateString);
  };

  useEffect(() => {
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // limpieza del intervalo al desmontar componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative flex gap-2 items-center text-blue-600">
      <article className="relative flex flex-col items-end gap-1 text-2xl font-semibold">
        <div id="date">{dateString}</div>
        <div id="time">{timeString}</div>
      </article>

      <article className="relative flex items-center justify-center">
        <IoMdClock size={80} />
      </article>
    </section>
  );
};

export default DigitalClock;
