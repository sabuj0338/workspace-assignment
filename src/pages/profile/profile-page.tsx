import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export default function ProfilePage() {
  return (
    <Card className="rounded-none border-0 shadow-xs mt-3">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
          <div className="flex gap-4">
            <Avatar className="w-20 h-20 border-2 border-gray-300">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-">
              <p className="text-sm text-gray-500">Designation</p>
              <p className="text-2xl font-semibold">Mr. Jhon Doe</p>
              <p className="text-sm text-gray-500">ID: 123</p>
            </div>
          </div>
          <div className="flex justify-start md:justify-end gap-3">
            <Link to="/dashboard/profile/edit"><Button>Edit Profile</Button></Link>
            <Button className="" disabled>
              Change Password
            </Button>
          </div>
        </div>
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">User Name*</p>
              <p className="text-xs font-light">Jhon Doe</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Email*</p>
              <p className="text-xs font-light">example@example.com</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Your Default Company*</p>
              <p className="text-xs font-light">Next Sourcing Bangladesh</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">User Id*</p>
              <p className="text-xs font-light">123</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Contact No*</p>
              <p className="text-xs font-light">+8801234567890</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Default Company Address*</p>
              <p className="text-xs font-light">House #127 Road #02(New)/10(old),Dohs Mirpur, 1216</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
