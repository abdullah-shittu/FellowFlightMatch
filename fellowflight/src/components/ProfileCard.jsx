"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Assume you have a similar icon component for the airplane
// For a real project, you would use a library like lucide-react.
// import { AirplaneIcon, LinkedInIcon } from "lucide-react";

// For this example, we'll use placeholder SVGs
const AirplaneIcon = () => (
    <svg className="w-10 h-10 text-white opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L12 22M12 2L19 9M12 2L5 9M19 9L19 15M5 9L5 15M19 15L12 22M5 15L12 22" />
    </svg>
);
const LinkedInIcon = () => (
    <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.766s.784-1.766 1.75-1.766 1.75.79 1.75 1.766-.783 1.766-1.75 1.766zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

export function ProfileCard({ user, matchType, matchDetails, isSameFlight }) {
    const headerBgColor = isSameFlight
        ? "bg-gradient-to-tr from-green-400 to-green-600"
        : "bg-gradient-to-tr from-purple-400 to-pink-600"; // Example for Airport Overlap

    return (
        <Card className="rounded-xl shadow-md overflow-hidden w-full max-w-xs">
            {/* Header Section */}
            <div className={`relative p-6 flex flex-col items-center justify-center space-y-2 ${headerBgColor}`}>
                {isSameFlight && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <AirplaneIcon />
                    </div>
                )}
                
                {/* Profile Image & LinkedIn Icon */}
                <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 z-20">
                    <LinkedInIcon />
                </a>
            </div>

            {/* Content Section */}
            <CardContent className="flex flex-col items-center text-center p-6 space-y-1">
                <h3 className="text-xl font-semibold text-primary-text">{user.name}</h3>
                <p className="text-sm text-secondary-text">{user.subtitle}</p>
                
                {isSameFlight && (
                    <p className="text-sm text-green-600 font-medium">Same Flight</p>
                )}
                {!isSameFlight && matchDetails && (
                    <p className="text-sm text-yellow-600 font-medium">{matchDetails.overlapTime}</p>
                )}
                
                <div className="mt-4 w-full">
                    <Button className="w-full bg-accent text-black hover:bg-blue-600">
                        Message on Slack
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}