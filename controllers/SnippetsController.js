const { pool } = require("../dbConnection");

module.exports.SaveSnippets = async function (req, res) {
  console.log("########## save snippets #################");
  console.log(req.body);
  console.log(req.sessionInfo);

  try {
    const client = await pool.connect();

    let query = {
      text: "INSERT INTO public.snippets (userid,html,css,js,libraries) VALUES($1, $2,$3,$4,$5) RETURNING *",
      values: [
        req.sessionInfo.userid,
        req.body.snippets.html,
        req.body.snippets.css,
        req.body.snippets.js,
        JSON.stringify(req.body.libraries),
      ],
    };
    let result = await client.query(query);
    console.log("############# info saved #################");
    console.log(result.rows);
    res.status(201).json({ data: result.rows });
  } catch (err) {
    console.log(err);
  }
};

module.exports.ViewSnippet = async function (req, res) {
  console.log("################### View snippet ##############");
  console.log(req.params);
  try {
    const client = await pool.connect();
    let query = {
      text: "select * from public.snippets where id=$1",
      values: [req.params.id],
    };
    let queryRes = await client.query(query);
    console.log(queryRes.rows);
    res.send(queryRes.rows[0].html);
  } catch (err) {
    console.log(err);
  }
};
