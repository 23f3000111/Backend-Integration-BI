import React, { useState } from "react";

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    rating: "",
    website: "",
    phoneNumber: "",
    checkInTime: "",
    checkOutTime: "",
    amenities: "",
    priceRange: "",
    reservationsNeeded: false,
    isParkingAvailable: false,
    isWifiAvailable: false,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: "",
  });

  const categories = [
    "Budget",
    "Mid-Range",
    "Luxury",
    "Boutique",
    "Resort",
    "Other",
  ];
  const priceRanges = ["$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw "Failed to add hotel";
      }

      const data = await response.json();
      console.log("Added Hotel:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add New Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Category:</label>
        <br />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat}>{cat}</option>
          ))}
        </select>
        <br />
        <br />

        <label>Location:</label>
        <br />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <br />

        <label>Rating:</label>
        <br />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <br />

        <label>Website:</label>
        <br />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <br />

        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <br />

        <label>Check-In Time:</label>
        <br />
        <input
          type="text"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />
        <br />

        <label>Check-Out Time:</label>
        <br />
        <input
          type="text"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
        />
        <br />

        <label>Amenities:</label>
        <br />
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Price Range:</label>
        <br />
        <select
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
        >
          <option value="">Select Price Range</option>
          {priceRanges.map((price) => (
            <option value={price}>{price}</option>
          ))}
        </select>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="reservationsNeeded"
            checked={formData.reservationsNeeded}
            onChange={handleChange}
          />
          Reservations Needed
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isParkingAvailable"
            checked={formData.isParkingAvailable}
            onChange={handleChange}
          />
          Parking Available
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isWifiAvailable"
            checked={formData.isWifiAvailable}
            onChange={handleChange}
          />
          Wifi Available
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isPoolAvailable"
            checked={formData.isPoolAvailable}
            onChange={handleChange}
          />
          Pool Available
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isSpaAvailable"
            checked={formData.isSpaAvailable}
            onChange={handleChange}
          />
          Spa Available
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isRestaurantAvailable"
            checked={formData.isRestaurantAvailable}
            onChange={handleChange}
          />
          Restaurant Available
        </label>
        <br />
        <br />

        <label>Photos (URLs):</label>
        <br />
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHotelForm;
