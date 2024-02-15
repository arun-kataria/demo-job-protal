import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import GithubCard from "../../Elements/GithubCard";
import Paper from "@mui/material/Paper";
import { useUser } from "../../UserContext";
import ROUTE from "../../Config/constant";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  lineHeight: "60px",
}));

export default function FeelencerDetail() {
  //const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [repoArray, setRepoArray] = React.useState([]);
  const [error, setError] = React.useState(false);

  const fetchRepo = (gitUserName) => {
    fetch(`https://api.github.com/users/${gitUserName}/repos`)
      .then((re) => re.json())
      .then((rep) => {
        setRepoArray(rep);
        setError(false);
      })
      .catch((e) => {
        setError(true);
      });
  };

  React.useEffect(() => {
    fetchRepo(user.gitUserName ? user.gitUserName : "arun-kataria");
  }, [user]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        variant="contained"
        sx={{ position: "fixed", right: 30, top: 100 }}
        onClick={() => navigate(ROUTE.JOB_LIST)}
      >
        Apply on jobs
      </Button>
      <Card sx={{ m: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Arun Kataria"
          subheader="Web developer"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/07/insert-image-html.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>About:</Typography>
            <Typography paragraph>
              Enthusiastic and results-oriented Software Engineer with 6 years
              of experience in full-stack web development, proficient in a wide
              range of technologies and frameworks. Proven ability to design,
              develop, and deploy dynamic and user-friendly web applications
              from scratch, ensuring optimal performance and scalability.
              Possesses strong problem-solving skills and enjoys collaborating
              in cross-functional teams to deliver innovative solutions.
            </Typography>
            <Typography paragraph>
              Technical Skills: Front-end development: HTML5, CSS3, JavaScript
              (including React, Angular, Vue.js), Bootstrap, Material UI
              Back-end development: Python (Django, Flask), Node.js
              (Express.js), Java (Spring Boot) Databases: MySQL, PostgreSQL,
              MongoDB Version control: Git DevOps tools: Docker, Kubernetes
            </Typography>
            <Typography paragraph>
              Developed and launched a new e-commerce platform, resulting in a
              20% increase in conversion rates. Refactored a legacy codebase,
              improving performance by 30% and reducing maintenance costs. Led
              the development of a real-time chat application using WebSockets,
              ensuring optimal scalability and responsiveness. Collaborated with
              designers and product managers to translate user needs into
              functional web applications.
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4, ml: 2 }}>Repositry</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              pr: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: {
                lg: "1fr 1fr 1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {repoArray.map((item) => (
              <Item key={item.id} elevation={6}>
                <GithubCard item={item} />
              </Item>
            ))}
            {error ? <Box>Opps something went wrong</Box> : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
