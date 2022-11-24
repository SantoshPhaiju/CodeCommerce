import Link from 'next/link';
import React from 'react'

const AccountSideBar = () => {
  return (
    <div className="sidebar w-[25%] px-8 mx-auto mb-10">
      <p className="font-firasans text-sm">Hello, Santosh Phaiju</p>
      <div className="list mt-6">
        <Link href={"/myaccount"}>
          <h2 className="font-rubik text-pink-900 text-xl my-2">
            Manage My Account
          </h2>
        </Link>
        <ul className="ml-6 font-ubuntu text-gray-700 text-lg">
            <Link href={"/myprofile"}>
             <li>My Profile</li>
            </Link>
          <li>Address Book</li>
          <li>My Payment Options</li>
          <li>Vouchers</li>
        </ul>
      </div>
      <div className="list mt-6">
        <Link href={"/myaccount"}>
          <h2 className="font-rubik text-pink-900 text-xl my-2">My Orders</h2>
        </Link>
        <ul className="ml-6 font-ubuntu text-gray-700 text-lg">
          <li>My Returns</li>
          <li>My Cancellations</li>
        </ul>
      </div>
      <div className="list mt-6">
        <Link href={"/myaccount"}>
          <h2 className="font-rubik text-pink-900 text-xl my-2">My Reviews</h2>
        </Link>
      </div>
      <div className="list mt-6">
        <Link href={"/myaccount"}>
          <h2 className="font-rubik text-pink-900 text-xl my-2">My Wishlist</h2>
        </Link>
      </div>
    </div>
  );
}

export default AccountSideBar
