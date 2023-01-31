import Router from 'next/router';
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<Record<string, string>>({ first_name: "te", last_name: "te", email: "t@tete.com"});

  const redirectOrStay = () => {
    const token = localStorage?.getItem("token");
    const user = localStorage?.getItem("user");
    console.log(user)
    if (!token || !user) {
      Router.router?.push("/401")
    } else {
      // setUser(JSON.parse(user));
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      redirectOrStay();
    }
  });

  return (
    <div className="w-full md:w-9/12 mx-2 h-full">
      <div className="bg-white p-3">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="tracking-wide">Profile</span>
        </div>
        <div className="text-gray-700">
          <div className="grid md:grid-cols-4 text-sm">
            <div className="grid grid-cols-1">
              <div className="px-4 py-2 font-semibold">Name</div>
              <div className="px-4 py-2">{user?.first_name} {user?.last_name}</div>
            </div>
            <div className="grid grid-cols-1">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}