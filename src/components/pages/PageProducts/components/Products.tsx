import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Product} from "models/Product";
import {formatAsPrice} from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";
import axios from 'axios';
import API_PATHS from "constants/apiPaths";
// import productList from "./productList.json";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  // если есть code получить id_token 
  // если нет code id_token должен быть уже получен на час 

  // ltknfm pfghjcs c id_token

  // const client_id =  '20j62j5kvu2l4lbm5frct2epf';
  // const client_secret =  'mao47fpopqg5t33qh0eiie89hsubaq53lo0315cg45v9kjuagji';
  // const authUrl = 'https://bt-speakers-prodpool'; // 'https://bt-speakers-prodpool.auth.eu-west-1.amazoncognito.com/oauth2/token/';

  // const redirectUri = 'https://da9r8ap8vw7x3.cloudfront.net/';

  // const urlParams = new URLSearchParams(window.location.search);
  // const userPoolCode = urlParams.get('code');

  // console.log('userPoolCode', userPoolCode);

  
  // const basicAuthToken = Buffer.from(client_id + ':' + client_secret).toString('base64');  
  // // get products using id_token
  // const oauthParams = {
  //     headers: {
  //       'Authorization': 'Basic ' + basicAuthToken,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     params: {
  //       grant_type: 'authorization_code',
  //       client_id: client_id,
  //       redirect_uri: redirectUri,
  //       code: userPoolCode
  //     }
  //   };


  // console.log('headers', oauthParams);

  // useEffect(() => {

  //   axios.post(authUrl, null, oauthParams)
  //      .then(res => {
  //        console.log('oauth2', res.data);

  //       // headers with Authorization Bearer res.id_token

  //       //  axios.get(`${API_PATHS.bff}/products`, headers)
  //       //  .then(res => setProducts(res.data));
  //       //   }, [])

  //      } );
  // }, []);

  useEffect(() => {
    axios.get(`${API_PATHS.bff}/products`)
       .then(res => setProducts(res.data));
    //setProducts(productList);
  }, [])

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title} ({product.count})
              </Typography>
              <Typography>
                {formatAsPrice(product.price)}
              </Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product}/>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
