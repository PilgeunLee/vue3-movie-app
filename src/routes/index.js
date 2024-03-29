import{ createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
    //hash
    //https://google.com/#/search
    history: createWebHashHistory(),
    //pages
    routes:[
        {
            path:'/',
            component: Home
        },
        {
            path:'/movie',
            component: Movie
        },
    
        {
            path:'/about',
            component: About
        }
    ]
})