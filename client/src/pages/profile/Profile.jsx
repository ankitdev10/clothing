import { useState } from "react";
import { userStore } from "../../store";
import "./profile.scss";
import { useMutation } from "react-query";
import axios from "axios";
const Profile = () => {
  const { user, saveUser } = userStore((state) => state);
  const { username, email, phone, street, city, country } = user;
  const [editable, setEditable] = useState({ personal: false, address: false });
  const [editUser, setEditUser] = useState({});

  const { _id } = user;

  const personalInfo = [
    {
      label: "username",
      name: "username",
      placeholder: username,
      type: "text",
    },
    {
      name: "email",
      label: "email",
      placeholder: email,
      type: "email",
    },
    {
      name: "password",
      label: "password",
      placeholder: "********",
      type: "password",
    },
    {
      label: "phone",
      name: "phone",
      placeholder: phone,
      type: "text",
    },
  ];

  const addressInfo = [
    {
      label: "street",
      name: "street",
      placeholder: street,
      type: "text",
    },
    {
      label: "city",
      name: "city",
      placeholder: city,
      type: "text",
    },
    {
      label: "country",
      name: "country",
      placeholder: country,
      type: "text",
    },
  ];

  const deleteUser = async () => {
    try {
      const res = await axios.delete("/user" + _id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditable = (e) => {
    const { name } = e.target;
    if (name === "personal") {
      setEditable((prev) => {
        return { ...prev, personal: !editable.personal };
      });
    } else {
      setEditable((prev) => {
        return { ...prev, address: !editable.address };
      });
    }
  };

  const { mutate, isSucess } = useMutation(
    (user) => {
      return axios.put("/user/update/" + _id, user);
    },
    {
      onSuccess: (data) => {
        saveUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => {
      return {
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(editUser);
  };

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <aside className="left">
          <h4 className>Profile</h4>
          <h5 className="delete__acc">Delete Account</h5>
        </aside>
        <main className="right">
          <section className="top">
            <h3>Personal Information</h3>
            {!editable.personal ? (
              <button onClick={handleEditable} name="personal">
                Edit
              </button>
            ) : (
              <>
                <button onClick={handleSubmit}>Submit</button>
                <button
                  className="cancel__edit"
                  name="personal"
                  onClick={handleEditable}
                >
                  X
                </button>
              </>
            )}

            <form action="">
              {personalInfo.map((item) => (
                <div className="item" key={item.label}>
                  <label>{item.label}</label>
                  <input
                    name={item.name}
                    disabled={!editable.personal}
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    value={editUser.name}
                  />
                </div>
              ))}
            </form>
          </section>
          <section className="bottom" style={{ marginTop: "2rem" }}>
            <h3>Address</h3>
            {!editable.address ? (
              <button name="address" onClick={handleEditable}>
                Edit
              </button>
            ) : (
              <>
                <button onClick={handleSubmit}>Submit</button>
                <button
                  className="cancel__edit"
                  name="address"
                  onClick={handleEditable}
                >
                  X
                </button>
              </>
            )}
            <form action="">
              {addressInfo.map((item) => (
                <div className="item" key={item.label}>
                  <label>{item.label}</label>
                  <input
                    name={item.name}
                    disabled={!editable.address}
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    value={editUser.name}
                  />
                </div>
              ))}
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
