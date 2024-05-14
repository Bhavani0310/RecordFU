import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import skillApi from "../../apis/skills.api";

const Addskills = ({ setUserInput, userInput }) => {
  const [skills, setskills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    searchSkills(event.target.value);
  };
  const searchSkills = (query) => {
    let filteredSkills = [];
    skills.map(
      (row) =>
        (filteredSkills = [
          ...filteredSkills,
          ...row.filter((item) => item.skillName.toLowerCase().includes(query)),
        ])
    );
    setSearchResults(filteredSkills);
  };
  const removeSkill = (id) => {
    const removedSkills = selectedSkills.filter((skill) => skill._id != id);
    setSelectedSkills(removedSkills);
  };
  const handleSelectSkill = (skill) => {
    selectedSkills.length <= 5 && setSelectedSkills((prev) => [...prev, skill]);

    setSearchTerm("");
  };
  useEffect(() => {
    skillApi.getSkills({
      //   query: q,
      success: (res) => {
        const skillset = [...res.data.data.map((skill) => skill.skills)];
        setskills(skillset);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
    searchSkills(" ");
    const selectedskills = searchResults.filter((skill) =>
      userInput.skills.map((skill2) => skill2 == skill.skillId)
    );

    setSelectedSkills(selectedskills);
  }, []);
  useEffect(() => {
    const skillsId = selectedSkills.map((skill) => skill.skillId);
    setUserInput({ ...userInput, skills: skillsId });
  }, [selectedSkills]);
  return (
    <div>
      <div
        className="d-flex"
        style={{
          backgroundColor: "#F3F3F3",
          color: "#858585",
          fontSize: "18px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <ul
          style={{
            alignItems: "center",
            display: "flex",
            margin: "0",
            padding: "0",
            justifyContent: "center",
          }}
          className="d-flex"
        >
          {selectedSkills.slice(0, 5).map((skill, i) => (
            <li
              key={i}
              style={{
                margin: "0",
                padding: "5px",
                backgroundColor: "#858585",
                color: "#F3F3F3",
                borderRadius: "10px",
              }}
            >
              {skill.skillName}
              <GoX
                onClick={() => removeSkill(skill._id)}
                style={{
                  cursor: "pointer",
                }}
              />
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Ex: HTML, CSS"
          value={searchTerm}
          onChange={handleChange}
          style={{
            backgroundColor: "#F3F3F3",
            color: "#858585",
            fontSize: "18px",
            width: "200px",
            border: "none",
            outline: "none",
          }}
        />
        {/* <div
          style={{
            color: "white",

            background:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            border: "none",
          }}
          className="btn d-flex tw-justify-center "
          onClick={handleAddSkill}
        >
          Add Skills{" "}
          <span
            style={{
              fontWeight: "800",
              fontSize: "16px",
              margin: "0",
              padding: "0",
            }}
          >
            {" "}
            +
          </span>
        </div> */}
      </div>
      <div className="d-flex justify-content-start align-items-center flex-wrap">
        {searchResults
          ?.slice(0, 8)
          .filter(
            (item1) =>
              !selectedSkills
                .map((item2) => item2.skillId)
                .includes(item1.skillId)
          )
          .map((item, index) => {
            return (
              <div
                className="d-flex justify-content-around align-items-center rounded-pill pl-2 border bg-white m-1"
                style={{
                  paddingLeft: " 0.5rem",
                  paddingRight: "0.5rem",
                  gap: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
                onClick={() => handleSelectSkill(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.skillName}
                  style={{ width: "20px" }}
                />
                <p
                  className="text-center mt-2 pr-2 fw-medium"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {item.skillName}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Addskills;
