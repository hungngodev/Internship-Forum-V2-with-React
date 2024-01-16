import styled from 'styled-components';

const Wrapper = styled.section`
html {
	font-size: 20px;
}

.Title {
  font-family: "Permanent Marker", cursive;
  font-size: 3.8rem;
  line-height: 0.8rem;
}

.lead {
  font-family: serif;
  font-size: 1.5rem;

}

.card-group,
.big-card {
  width: 20vmin;
  height: 20vmin;
}

.card-group {
  position: relative;
  bottom: 5rem;
  -webkit-transition: transform 400ms ease;
  -moz-transition: transform 400ms ease;
  -ms-transition: transform 400ms ease;
  -o-transition: transform 400ms ease;
  transition: transform 400ms ease;
}

.big-card {
  -moz-transform: translate(0%,500%);
  -webkit-transform: translate(0%,500%);
  -o-transform: translate(0%,500%);
  -ms-transform: translate(0%,500%);
  transform: translate(0%,500%);
  -webkit-transition: transform 1s cubic-bezier(.05, .43, .25, .95);
  -moz-transition: transform 1s cubic-bezier(.05, .43, .25, .95);
  -ms-transition: transform 1s cubic-bezier(.05, .43, .25, .95);
  -o-transition: transform 1s cubic-bezier(.05, .43, .25, .95);
  transition: transform 1s cubic-bezier(.05, .43, .25, .95);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  background-position: center;
  background-size: cover;
}

.big-card:nth-child(3) {
  background-image: url("https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  z-index: -4;
}

.big-card:nth-child(4) {
  background-image: url("https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  z-index: -3;
}

.big-card:nth-child(5) {
  background-image: url("https://images.unsplash.com/photo-1662947203582-2787ab7f2920?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  z-index: -2;
}

.big-card:nth-child(6) {
  background-image: url("https://images.unsplash.com/photo-1662947368791-8630979e964b?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  z-index: -1;
}

.big-card:nth-child(7) {
  background-image: url("https://images.unsplash.com/photo-1662947852129-ead669d746f0?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  z-index: -2;
}

.big-card:nth-child(8) {
  background-image: url("https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  z-index: -3;
}

.big-card:nth-child(9) {
  background-image: url("https://images.unsplash.com/photo-1612810806695-30f7a8258391?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  z-index: -4;
}

.card-group:hover>.big-card {
  box-shadow: -2vmin 2vmin 3vmin rgba(0, 0, 0, 0.4);

}

.card-group:hover>.big-card:nth-child(3) {
  -moz-transform: translate(-200%, 170%) rotate(-64deg);
  -webkit-transform: translate(-200%, 170%) rotate(-64deg);
  -o-transform: translate(-200%, 170%) rotate(-64deg);
  -ms-transform: translate(-200%, 170%) rotate(-64deg);
  transform: translate(-200%, 170%) rotate(-64deg);
}

.card-group:hover>.big-card:nth-child(4) {
  -moz-transform: translate(-150%, 120%) rotate(-38deg);
  -webkit-transform: translate(-150%, 120%) rotate(-38deg);
  -o-transform: translate(-150%, 120%) rotate(-38deg);
  -ms-transform: translate(-150%, 120%) rotate(-38deg);
  transform: translate(-150%, 120%) rotate(-38deg);
}

.card-group:hover>.big-card:nth-child(5) {
  -moz-transform: translate(-80%, 83%) rotate(-22deg);
  -webkit-transform: translate(-80%, 83%) rotate(-22deg);
  -o-transform: translate(-80%, 83%) rotate(-22deg);
  -ms-transform: translate(-80%, 83%) rotate(-22deg);
  transform: translate(-80%, 83%) rotate(-22deg);

}

.card-group:hover>.big-card:nth-child(6) {
  -moz-transform: translate(0%, 65%);
  -webkit-transform: translate(0%, 65%);
  -o-transform: translate(0%, 65%);
  -ms-transform: translate(0%, 65%);
  transform: translate(0%, 65%);
}

.card-group:hover>.big-card:nth-child(7) {
  -moz-transform: translate(80%, 83%) rotate(22deg);
  -webkit-transform: translate(80%, 83%) rotate(22deg);
  -o-transform: translate(80%, 83%) rotate(22deg);
  -ms-transform: translate(80%, 83%) rotate(22deg);
  transform: translate(80%, 83%) rotate(22deg);
}

.card-group:hover>.big-card:nth-child(8) {
  -moz-transform: translate(150%, 120%) rotate(38deg);
  -webkit-transform: translate(150%, 120%) rotate(38deg);
  -o-transform: translate(150%, 120%) rotate(38deg);
  -ms-transform: translate(150%, 120%) rotate(38deg);
  transform: translate(150%, 120%) rotate(38deg);
}

.card-group:hover>.big-card:nth-child(9) {
  -moz-transform: translate(200%, 170%) rotate(64deg);
  -webkit-transform: translate(200%, 170%) rotate(64deg);
  -o-transform: translate(200%, 170%) rotate(64deg);
  -ms-transform: translate(200%, 170%) rotate(64deg);
  transform: translate(200%, 170%) rotate(64deg);
}


.btnfos {
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 400;
  line-height: 3rem;
  max-width: 400px;
  margin: 0 auto 4rem;
  position: relative;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  font-family: Georgia, serif;
  text-decoration: none;
  text-transform: none;
  z-index: 5;
}

.btnfos {
  font-weight: 100;
}

.btnfos svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 200rem;
  height: 4rem;
  -moz-transform: translate(-25%, -10%);
  -webkit-transform: translate(-25%, -10%);
  -o-transform: translate(-25%, -10%);
  -ms-transform: translate(-25%, -10%);
  transform: translate(-100rem, -10%);
}

.btnfos rect {
  fill: none;
  stroke: #fff;
  stroke-width: 10;
  stroke-dasharray: 6000, 0;
  -webkit-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -moz-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -ms-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -o-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-group:hover>.btnfos {

  background: rgba(225, 51, 45, 0);
  letter-spacing: 1px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 900;
}

.card-group:hover>.btnfos rect {
  stroke-width: 10;
  stroke-dasharray: 0, 4000;
  stroke-dashoffset: 100;
  -webkit-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -moz-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -ms-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  -o-transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
}

@media screen and (max-width: 756px) {
  html {
font-size: 15px;
}
}

@media screen and (max-width: 400px) {
html {
font-size: 10px;
}
}

@media screen and (max-aspect-ratio: 1.3) {
  .big-card {
    -moz-transform: translate(0%,750%);
    -webkit-transform: translate(0%,750%);
    -o-transform: translate(0%,750%);
    -ms-transform: translate(0%,750%);
    transform: translate(0%,750%);

  }
}
`;

export default Wrapper;
