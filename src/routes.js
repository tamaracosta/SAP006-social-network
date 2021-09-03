import { TemplateLogin } from './pages/login/index.js';
import { TemplateCadastro } from './pages/cadastro/index.js';
import { TemplatePerfil } from './pages/perfil/index.js';
import { TemplateRecuperar } from './pages/recuperar/index.js';
import { TemplateFeed } from './pages/feed/index.js';

export const routeRender = () => {
  // firebase.auth().onAuthStateChanged((user) => {
    
    // if (user == null && rotaAtual !== '/cadastro' && rotaAtual !== '/recuperar' && rotaAtual !== '/login') {
    //   window.history.pushState({}, null, '/login');
    //   const popStateEvent = new PopStateEvent('popstate', {});
    //   dispatchEvent(popStateEvent);
    // }

    
    
    const routes = {
      '/': TemplateLogin,
      '/login': TemplateLogin,
      '/cadastro': TemplateCadastro,
      '/recuperar': TemplateRecuperar,
      '/perfil': TemplatePerfil,
      '/feed': TemplateFeed,
    };

    const rotaAtual = window.location.pathname;
    const element = document.querySelector('#root');
    element.innerHTML = '';

    switch(rotaAtual){
      case '/':
      case '/login':
      case '/cadastro':
        element.appendChild(routes[rotaAtual]());
        break;
      
      default:
        firebase.auth().onAuthStateChanged((user) => {
          if (user){
            element.appendChild(routes[rotaAtual]());
          }
          else {
            window.history.pushState({}, null, '/login');
            const popStateEvent = new PopStateEvent('popstate', {});
            dispatchEvent(popStateEvent);
          }
        });
    }

    //element.innerHTML = '';
    //element.appendChild(routes[window.location.pathname]());
  // });
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);
