"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT"
      });

      if (res.status === 200) {
        const { message: { read } } = await res.json();
        setIsRead(read);
        toast.success( read ? "Marked as read" : "Marked as new");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        { message.property.name }
      </h2>
      <p className="text-gray-700">
        {message.body}
      </p>

      <ul className="mt-4">
        <li><strong>Name: </strong> {message.sender.username}</li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500"
          >{message.email}</a
          >
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500"
          >{message.phone}</a
          >
        </li>
        <li><strong>Received: </strong>{new Date(message.createdAt).toLocaleString()}</li>
      </ul>
      <button
        className={`mt-4 mr-3 ${isRead ? "bg-gray-300": "bg-blue-500 text-white"}  py-1 px-3 rounded-md`}
        onClick={handleReadClick}
      >
        { isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  )
};

export default Message;