conn = new Mongo();
db = conn.getDB("imts");
usr = db.users;

usr.insert([
  {
    username: "jsmith",
    passwordHash: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    token: "7cf2e5f72d3e144cad58f95214f2dd20ad8f9979f34d561433a31dacbc16071b",
    isPhysician: false,
    data: {
      (new Date(2017, 2, 27, 14, 24, 0)): {
        question1: 0.3,
        question2: true
      },
      (new Date(2017, 3, 2, 3, 35, 0)): {
        question1: 0.34
        question2: true
      },
      (new Date(2017, 3, 5, 2, 13, 0)): {
        question1: 0,
        question2: false
      }
    }
  },
  {
    username: "impatient",
    passwordHash: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    token: "31ce44f0243fb550a7748ffe12e0fbb3b6c0f9f3210f400c70fdf2ba05ffc867",
    isPhysician: false,
    data: {
      (new Date(2017, 2, 27, 15, 17, 0)): {
        question1: 0.9,
        question2: true
      },
      (new Date(2017, 3, 5, 8, 37, 0)): {
        question1: 1,
        question2: true
      }
    }
  },
  {
    username: "awilliams",
    passwordHash: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    token: "899891c246d6587b0ea115948e2ac50c0e0386afa53a5e23d109452aed809ccf",
    isPhysician: true,
    patients: [
      "jsmith",
      "impatient"
    ]
  }
]);
