import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

function Event() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const { data, loading } = useFetch("http://localhost:3000/events");

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    return date.toLocaleString("en-US", options) + " IST";
  };

  const filterEvent =
    search == "" && type == ""
      ? data
      : search != ""
      ? data.filter(
          (d) =>
            d.title == search ||
            (Array.isArray(d?.tag) && d.tag.some((t) => t == search))
        )
      : search == "" && type != ""
      ? data.filter((d) => d.type == type)
      : data.filter(
          (d) =>
            d.title == search ||
            (Array.isArray(d?.tag) && d.tag.some((t) => t == search))
        );

        const typeFilter = type != "" ? filterEvent.filter(filter => filter.type == type) : filterEvent

  return (
    <div className="bg-light mb-5">
      <div className="container">
        <nav className="navbar pb-3">
          <h1 className="navbar-brand text-danger">meetup</h1>
          <form className="form-inline">
            <input
              type="text"
              placeholder="Search by title and tag"
              className="rounded border-0 form-control"
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
        </nav>
        <hr />
        <main>
          <section className="navbar pb-4">
            <h1>Meetup Events</h1>
            <form className="form-inline">
              <select
                className="form-control text-secondary"
                onChange={(event) => setType(event.target.value)}
              >
                <option value="">Select Event Type &#x1F80B;</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </form>
          </section>
          <section>
            <div className="row g-5">
              {data &&
                typeFilter.map((event) => (
                  <div key={event._id} className="col-md-4 ">
                    <img
                      src={event.thumbnailUrl}
                      alt="thumbnail"
                      className="rounded"
                    />
                    <p className="text-secondary m-0">
                      {formatDate(event.startDate)}
                    </p>
                    <h4 className="d-inline text-nowrap">{event.title}</h4><span className="ms-2">({event.type})</span><br />
                    <Link to={`/events/${event._id}`} className="m-2 btn btn-primary">View Details</Link>
                  </div>
                ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Event;
