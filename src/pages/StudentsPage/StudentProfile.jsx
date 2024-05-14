import React, { useState, useEffect } from "react";
import timer from "../../assets/svg/students/timer.svg";
import batch from "../../assets/svg/students/batch.svg";
import { useParams } from "react-router-dom";
import tick from "../../assets/svg/dashboard/tick.svg";
import achivement from "../../assets/svg/students/achivement.svg";
import skillBatch from "../../assets/svg/students/skillBatch.svg";
import greenArrow from "../../assets/svg/students/greenArrow.svg";

import questionMark from "../../assets/svg/students/questionMark.svg";
import instituteSvg from "../../assets/svg/students/instituteImg.svg";
import psgLogo from "../../assets/svg/students/paglogo.svg";
import kumaraguruLogo from "../../assets/svg/students/kumaragurulogo.svg";
import emptyLogo from "../../assets/svg/students/emptyLogo.svg";
import googleLogo from "../../assets/svg/students/googleSvg.svg";
import udemyLogo from "../../assets/svg/students/udemySvg.svg";
import openbtn from "../../assets/svg/students/openbtn.svg";
import linkedin from "../../assets/svg/socialMedia/linkedin.svg";
import instagram from "../../assets/svg/socialMedia/instagram.svg";
import x from "../../assets/svg/socialMedia/x.svg";
import StatsCard from "../PlacementPage/StatsCard";
import Card from "./Card";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import RadarChart from "./RadarChart";
import HeatmapCalender from "./HeatmapCalender";
import studentApi from "../../apis/student.api";

const StudentProfile = () => {
  const [skills, setSkills] = useState({
    roleBasedSkills: [],
    interestBasedSkills: [],
    skillBadges: [],
  });
  const [education, setEducation] = useState([]);
  const [otherActivity, setOtherActivity] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [projects, setProject] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [data, setData] = useState([]);
  const { studentId } = useParams();
  useEffect(() => {
    studentApi.getStudentProfile({
      studentId,
      success: (res) => {
        setData(res.data.data);
        setEducation(res.data.data.educations);
        setWorkExperience(res.data.data.workexperiences);
        setLicenses(res.data.data.licensecertifications);
        setSkills(res.data.data.skillRepository);
        setOtherActivity(res.data.data.activities);
        setProject(res.data.data.projects);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, [studentId]);

  function formatMonthYear(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${month} ${year}`;
  }
  const totalLearned = data.learningActivities
    ? data.learningActivities.reduce((total, item) => total + item.learned, 0)
    : 0;
  const pronoun = data.gender
    ? data.gender === "male"
      ? "he/him"
      : gender === "female"
      ? "she/her"
      : "they/them"
    : "";
  return (
    <div className="d-flex justify-content-between">
      {/* left panel */}
      <section
        className="d-flex flex-column align-items-center tw-h-fit border px-3 tw-py-4 rounded-4"
        style={{ width: "28%", minHeight: "100%" }}
      >
        {/* remaining time */}
        <p className="tw-w-full d-flex tw-font-semibold tw-text-[#6D6D6D] tw-justify-end tw-items-center  tw-text-[13px]">
          <img
            src={timer}
            className="tw-inline-flex tw-mr-1  tw-h-3 tw-w-3"
            alt="timer"
          />
          {totalLearned} /{" "}
          <span className="tw-text-[11px]">
            {data.goalHours} {data.goalType}
          </span>
        </p>
        {/* profile */}
        <div className="tw-w-full tw-border-b-2 pb-4 d-flex gap-2 tw-justify-between tw-items-center ">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
            className=" mt-2 tw-rounded-full tw-h-[50px] tw-w-[50px]"
          />

          <div className="d-flex  tw-flex-col">
            <h3 className="tw-text-2xl tw-leading-4 tw-mt-4 tw-font-semibold">
              {data.fullName}
              {pronoun && (
                <span className="tw-text-xs tw-font-normal tw-text-[#878787]">
                  ({pronoun})
                </span>
              )}
              <img
                className="tw-inline-flex tw-m-0 tw-h-4 tw-w-4"
                src={tick}
                alt="green-tick"
              />
            </h3>
            <p className=" tw-text-[#878787] tw-font-semibold text-lg">
              <img
                src={batch}
                className="tw-inline-flex tw-h-4 tw-w-4"
                alt="batch"
              />
              Level 1
            </p>
          </div>
        </div>
        {/* Focus skills */}
        <div className="tw-w-full  py-4 ">
          <h3 className="tw-text-xl  tw-font-semibold">Focus Skills</h3>
          {/* Rador chart */}
          <div className="border-2 tw-mt-2 f-flex tw-justify-center tw-rounded-xl">
            <RadarChart className="tw-m-auto" />
          </div>
        </div>
        <div className="d-flex tw-w-full tw-border-b-2 tw-pb-4  tw-justify-between">
          <StatsCard
            text="Role Based Skills"
            value={skills.skillBadges.roleBasedCount}
            iconWidth="25px"
            fontSize="25px"
            padding="tw-p-[12px]"
            icon={achivement}
            textStyle={"tw-text-sm tw-text-gray-500 tw-font-semibold"}
          />
          <StatsCard
            text="Interest Based Skills"
            value={skills.skillBadges.interestBasedCount}
            padding="tw-p-[12px]"
            iconWidth="25px"
            fontSize="25px"
            icon={achivement}
            textStyle={"tw-text-sm tw-text-gray-500 tw-font-semibold"}
          />
        </div>
        {/* Learning Activities */}
        <div className="tw-w-full tw-py-4 ">
          <h3 className="tw-text-xl mb-1 tw-font-semibold">
            Learning Activities
          </h3>

          {/* MoM Performance */}
          <div className="tw-p-4 tw-border-2 tw-px-5 tw-rounded-lg">
            <p className="tw-text-base tw-font-semibold">MoM Performance</p>
            <p className="tw-text-3xl tw-mt-2 d-flex tw-items-center tw-gap-2 tw-text-[#4CC46F] tw-font-semibold">
              <img
                src={greenArrow}
                className="tw-inline-flex tw-w-6 tw-h-6"
                alt="green arrow"
              />
              {totalLearned}%
            </p>
          </div>

          <HeatmapCalender />
        </div>
      </section>
      {/* right panel */}
      <section className="" style={{ width: "70%" }}>
        {/* About */}
        <h3 className="tw-font-semibold tw-text-2xl">About</h3>
        <div className="d-flex tw-justify-between">
          {/* paragrapth */}
          <p className="tw-text-justify tw-mt-1 tw-text-lg tw-w-[60%] tw-text-[#8F8F8F]">
            {data.about}
          </p>
          {/* contact */}
          <div className="tw-w-[38%] tw-h-32 tw-max-h-fit tw-p-4 tw-rounded-xl tw-border-2">
            <p className="tw-text-base tw-mb-2 tw-font-normal  tw-text-[#8F8F8F]">
              Contact -{" "}
              <span className="tw-text-black tw-text-base tw-font-semibold">
                {data.mobile}
              </span>
            </p>
            <p className="tw-text-base tw-mb-2 tw-font-normal  tw-text-[#8F8F8F]">
              Email -{" "}
              <span className="tw-text-black tw-text-base tw-font-semibold">
                {" "}
                {data.email}
              </span>{" "}
              <img
                className="tw-inline-flex tw-m-0 tw-h-4 tw-w-4"
                src={tick}
                alt="green-tick"
              />
            </p>
            <p className="tw-text-base tw-mb-2 tw-font-normal  tw-text-[#8F8F8F]">
              Birthday -{" "}
              <span className="tw-text-black tw-text-base tw-font-semibold">
                {data.dateOfBirth}
              </span>
              <img
                className="tw-inline-flex tw-m-0 tw-h-4 tw-w-4"
                src={tick}
                alt="green-tick"
              />
            </p>
          </div>
        </div>
        {/* Skills repository */}
        <h3 className="tw-font-semibold tw-mt-6 tw-text-2xl">
          Skills repository{" "}
        </h3>
        <div className="d-flex tw-justify-between tw-gap-4 tw-mt-3 tw-items-start">
          {/* Role based Skills */}
          <div className=" tw-w-full tw-rounded-xl tw-border-2 tw-p-3">
            <h4 className="tw-font-semibold  tw-mb-0 tw-text-xl">
              Role based Skills <img src={questionMark} alt="" />
            </h4>
            <p className="tw-text-[#8F8F8F] tw-text-base">
              Skills that you earn for your career.
            </p>
            <div className="d-flex tw-mt-3 tw-flex-wrap tw-gap-3">
              {skills.roleBasedSkills.slice(0, 5).map((skill) => (
                <div
                  key={skill.skillId}
                  className="d-flex tw-items-center tw-gap-2 tw-p-2 tw-border-2 tw-rounded-xl"
                >
                  <img
                    src={skillBatch}
                    className="tw-h-6 tw-w-6"
                    alt="skill batch"
                  />
                  <div className="">
                    <p className="tw-font-semibold tw-text-sm">
                      {skill.skill}{" "}
                      <img
                        className="tw-inline-flex tw-m-0 tw-h-4 tw-w-4"
                        src={tick}
                        alt="green-tick"
                      />
                    </p>
                    <p className="tw-text-xs tw-text-[#8F8F8F]">
                      {skill.endorsedCount} Endorsment
                    </p>
                  </div>
                </div>
              ))}
              <p className="tw-text-[#2B66F6] tw-cursor-pointer">
                See all <span className="tw-font-bold tw-text-lg"></span>{" "}
              </p>
            </div>
          </div>
          {/* Interest based Skills */}
          <div className=" tw-w-full tw-rounded-xl tw-border-2 tw-p-3">
            <h4 className="tw-font-semibold  tw-mb-0 tw-text-xl">
              Interest based Skills
            </h4>
            <p className="tw-text-[#8F8F8F] tw-text-base">
              Skills that you earn for your will.
            </p>
            <div className="d-flex tw-mt-3 tw-items-center tw-flex-wrap tw-gap-3">
              {skills.interestBasedSkills.slice(0, 4).map((skill, i) => (
                <div
                  key={i}
                  className="d-flex tw-items-center tw-gap-2 tw-p-2 tw-border-2 tw-rounded-xl"
                >
                  <img
                    src={skillBatch}
                    className="tw-h-6 tw-w-6"
                    alt="skill batch"
                  />
                  <div className="">
                    <p className="tw-font-semibold tw-text-sm">
                      {skill.skillName}{" "}
                      <img
                        className="tw-inline-flex tw-m-0 tw-h-4 tw-w-4"
                        src={tick}
                        alt="green-tick"
                      />
                    </p>
                    <p className="tw-text-xs tw-text-[#8F8F8F]">
                      {skill.endorsedCount} Endorsment
                    </p>
                  </div>
                </div>
              ))}
              {/* <p className="tw-text-[#2B66F6] tw-cursor-pointer">
                See all <span className="tw-font-bold tw-text-lg">></span>{" "}
              </p> */}
            </div>
          </div>
        </div>
        {/* Education */}
        <h3 className="tw-font-semibold tw-mt-6 tw-text-2xl">Education </h3>
        {education.map((item, i) => (
          <Card
            key={i}
            logo={item.logo ? item.logo : emptyLogo}
            title={item.institution}
            tick={item.verified ? tick : emptyLogo} // Indicate if verified
            desc={item.degree}
            year={`${item.startMonthYear} - ${item.endMonthYear}`}
            about={item.activitiesRoles}
          />
        ))}

        {/* Work Experience */}
        <h3 className="tw-font-semibold tw-mt-6 tw-text-2xl">
          Work Experience{" "}
        </h3>
        {workExperience.map((item) => {
          const sortedSkills = item.skills
            ?.slice()
            ?.sort((a, b) => b.endorsedCount - a.endorsedCount);
          const topSkills = sortedSkills?.slice(0, 4);

          // Concatenate top skill names into a single string
          const topSkillNames =
            topSkills?.map((skill) => skill.skillName) || [];
          const startFormatted = formatMonthYear(item.startDate);
          const endFormatted = formatMonthYear(item.endDate);
          return (
            <Card
              logo={item.logo ? item.logo : emptyLogo}
              tag={topSkillNames}
              tagColor={item.tagColor ? item.tagColor : "primary"}
              title={item.role}
              tick={item.verified ? tick : emptyLogo}
              desc={`${item.companyName} | ${item.location} | ${item.locationType}`}
              year={`${startFormatted} - ${endFormatted}`}
              about={item.description}
            />
          );
        })}

        {/* Licenses & Certifications */}
        <h3 className="tw-font-semibold tw-mt-6 tw-text-2xl">
          Licenses & Certifications{" "}
        </h3>
        {licenses.map((item) => {
          const sortedSkills = item.skills
            ?.slice()
            ?.sort((a, b) => b.endorsedCount - a.endorsedCount);
          const topSkills = sortedSkills?.slice(0, 4);

          const topSkillNames =
            topSkills?.map((skill) => skill.skillName) || [];

          const issueFormatted = formatMonthYear(item.issuedDate);

          return (
            <Card
              logo={item.logo ? item.logo : emptyLogo}
              tag={topSkillNames}
              btn={item.btn}
              tagColor={item.tagColor ? item.tagColor : "primary"}
              title={item.certificationName}
              desc={`${item.organization} | ${item.doneVia}`}
              year={`Issued on ${issueFormatted}`}
              btnLogo={item.btnLogo}
            />
          );
        })}
        <button className="tw-text-[#8F8F8F] tw-text-right tw-mt-2  tw-float-right tw-cursor-pointer tw-text-lg">
          Show all 3 Licenses & Certifications{" "}
          <MdOutlineKeyboardArrowRight className="tw-inline-flex tw-h-6 tw-w-auto" />
        </button>
        {/* Projects */}
        <h3 className="tw-font-semibold tw-mt-10 tw-text-2xl">Projects </h3>
        {projects.map((item) => {
          const sortedSkills = item.skills
            ?.slice()
            ?.sort((a, b) => b.endorsedCount - a.endorsedCount);
          const topSkills = sortedSkills?.slice(0, 6);

          const topSkillNames =
            topSkills?.map((skill) => skill.skillName) || [];

          const projectLinkText = item.projectLink ? (
            <a
              href={item.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-blue-500"
            >
              Project Link
            </a>
          ) : (
            ""
          );

          const startFormatted = formatMonthYear(item.startDate);
          const endFormatted = formatMonthYear(item.endDate);

          return (
            <Card
              logo={item.logo ? item.logo : emptyLogo}
              tag={topSkillNames}
              tagColor={item.tagColor ? item.tagColor : "primary"}
              title={item.projectName}
              tick={item.verified ? tick : emptyLogo}
              desc={`${item.associatedWith} | ${item.projectType}`}
              year={`${startFormatted} - ${endFormatted}`}
              about={item.description}
            />
          );
        })}
        <button className="tw-text-[#8F8F8F] tw-text-right tw-mt-2  tw-float-right tw-cursor-pointer tw-text-lg">
          Show all 3 Projects
          <MdOutlineKeyboardArrowRight className="tw-inline-flex tw-h-6 tw-w-auto" />
        </button>
        {/* Other Activities */}
        <h3 className="tw-font-semibold tw-mt-10 tw-text-2xl">
          Other Activities{" "}
        </h3>
        <div className="">
          {otherActivity.map((item) => {
            return (
              <Card
                key={item.activityId}
                logo={item.logo ? item.logo : emptyLogo}
                about={item.description}
                tag={item.tag}
                btn={item.btn}
                tagColor={item.tagColor}
                title={item.activityName}
                desc={`${item.organisation} | ${item.activityType}`}
                year={`${item.startDate.split("T")[0]} - ${
                  item.endDate.split("T")[0]
                }`}
                btnLogo={item.btnLogo}
              />
            );
          })}
        </div>
        <button className="tw-text-[#8F8F8F]  tw-mt-4  tw-cursor-pointer tw-text-xl">
          Social Media Links
          <a href="#">
            <img
              className="tw-inline-flex  tw-mx-1 tw-h-6 tw-ml-2 tw-w-6"
              src={linkedin}
              alt="linked in"
            />
          </a>
          <a href="#">
            <img
              className="tw-inline-flex tw-mx-1 tw-h-6 tw-w-6"
              src={instagram}
              alt="instagram"
            />
          </a>
          <a href="#">
            <img
              className="tw-inline-flex tw-mx-1 tw-h-6 tw-w-6"
              src={x}
              alt="x"
            />
          </a>
        </button>
      </section>
    </div>
  );
};

export default StudentProfile;
