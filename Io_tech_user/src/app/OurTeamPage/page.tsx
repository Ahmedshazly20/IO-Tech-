"use client";

import Image from 'next/image';
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";
import { RiTwitterXFill, RiFacebookFill } from "react-icons/ri";
import { useGetTeamMembersQuery } from '@/store/api/apiSlice';
import { TeamMember } from '@/types/strapi';

const OurTeamPage = () => {
  const { data: teamMembers, error, isLoading } = useGetTeamMembersQuery();

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#643F2E]">فريقنا</h1>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#643F2E]">فريقنا</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">حدث خطأ أثناء تحميل أعضاء الفريق</h3>
            <p className="text-red-600">
              {'status' in error ? `Error ${error.status}` : 'حدث خطأ غير معروف'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamMembers?.data || teamMembers.data.length === 0) {
    return (
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#643F2E]">فريقنا</h1>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">لا يوجد أعضاء فريق حاليًا</h3>
            <p className="text-gray-600">لا يتوفر أي أعضاء فريق في الوقت الحالي.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#643F2E]">
          OurTeam
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who drive our success and are committed to delivering excellence.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {teamMembers.data.map((member: TeamMember) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-4 border-[#643F2E]">
              <Image
                src={member.Photo ? member.Photo.url : '/dammy/team.png'}
                alt={member.Photo?.alternativeText || member.Name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="font-['DM_Sans'] font-bold text-xl leading-8 text-gray-800">
              {member.Name}
            </h2>
            <p className="mt-1 text-sm text-gray-500 font-semibold">{member.Role}</p>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {member.Description}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {member.WhatsApp && (
                <a
                  href={`https://wa.me/${member.WhatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-gray-500 hover:text-green-500 transition-colors text-2xl"
                >
                  <FaWhatsapp />
                </a>
              )}
              {member.Phone && (
                <a
                  href={`tel:${member.Phone}`}
                  aria-label="Phone"
                  className="text-gray-500 hover:text-blue-500 transition-colors text-2xl"
                >
                  <MdPhoneInTalk />
                </a>
              )}
              {member.Email && (
                <a
                  href={`mailto:${member.Email}`}
                  aria-label="Email"
                  className="text-gray-500 hover:text-red-500 transition-colors text-2xl"
                >
                  <CiMail />
                </a>
              )}
              {member.LinkedIn && (
                <a
                  href={member.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-500 hover:text-blue-700 transition-colors text-2xl"
                >
                  <FaLinkedinIn />
                </a>
              )}
              {member.Facebook && (
                <a
                  href={member.Facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-500 hover:text-blue-600 transition-colors text-2xl"
                >
                  <RiFacebookFill />
                </a>
              )}
              {member.Twitter && (
                <a
                  href={member.Twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-gray-500 hover:text-black transition-colors text-2xl"
                >
                  <RiTwitterXFill />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeamPage;