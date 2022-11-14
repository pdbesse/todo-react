import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import InterestList from "./InterestList";
// import MediaQuery from "react-responsive";
import "./Profile.css";
import Loader from "../../components/Loader/Loader";
// import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Profile = () => {
  const { _id: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME,
    {
      variables: { _id: userParam },
    });
  console.log({ loading, data });
  const user = data?.me?.profile || data?.user?.profile || {};
  // console.log(data);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <h4>Please login.</h4>;
  }
  //   let interests = user.interest;
  //   let images = user.images;

  //   const renderProfileInfo = () => {
  //     return (
  //       <>
  //         <h3 className="">About Me</h3>
  //         <p>{user.aboutme}</p>
  //         <h3 className="">Interests</h3>
  //         <div>
  //           <InterestList interests={interests} />
  //         </div>
  //         <div style={{ margin: "10px 0 " }}>
  //           <a
  //             href={`https://github.com/${user.github}`}
  //             target="_blank"
  //             rel="noreferrer noopener"
  //             className="container profileLinkButtons"
  //           >
  //             <AiOutlineGithub size={40} />
  //           </a>
  //           <a
  //             href={`https://www.linkedin.com/in/${user.linkedin}`}
  //             target="_blank"
  //             rel="noreferrer noopener"
  //             className="container profileLinkButtons"
  //           >
  //             <AiOutlineLinkedin size={40} />
  //           </a>
  //         </div>
  //       </>
  //     );
  //   };
  //   const renderImages = () => {
  //     return (
  //       <ResponsiveMasonry
  //         columnsCountBreakPoints={{
  //           350: 3,
  //           750: 3,
  //           900: 2,
  //           1200: 3,
  //           2100: 4,
  //         }}
  //       >
  //         <Masonry className="masonry_grid">
  //           {images.map((image, i) => (
  //             <img
  //               key={i}
  //               src={image}
  //               style={{ width: "95%", margin: "8px", borderRadius: "8px" }}
  //               alt=""
  //             />
  //           ))}
  //         </Masonry>
  //       </ResponsiveMasonry>
  //     );
  //   };
  return (
    <Row className="profileContainer">
      <Row className="profileHeader">
        <div>
          <h2 className="h2">
            {`${user.firstName}`} <span>{`${user.age}`}</span>
          </h2>
        </div>
      </Row>
      <Row className="profileHeader2">
        {/* <span className="job">{`${user.job}`}</span> */}
        <span className="city">{`${user.location}`}</span>
      </Row>
      {/* <Row>
        <MediaQuery minWidth={900}>
          <Col l={{ order: 1 }} className="containerLeftColumn">
            {renderProfileInfo()}
          </Col>
          <Col l={{ order: 2 }} className="containerRightColumn">
            {renderImages()}
          </Col>
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {renderImages()}
          {renderProfileInfo()}
        </MediaQuery>
      </Row> */}
    </Row>
  );
};

export default Profile;
