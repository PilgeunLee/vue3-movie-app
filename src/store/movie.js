import axios from 'axios'

export default {
     //module 
     namespaced : true,
    //data
     state: () =>({
        movies:[],
        message:'',
        loading: false
     }),
     //computed!
     getters: { 
        // movieIds(state){
        //     return state.movies.map(m => m.imdbID)
        // }
     },
     //methods!
     //변이
     mutations: {
        // assignMovies(state, Search){
        //     state.movie =Search
        // },
        updateState(state,payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies =[]
        }
     },

     //비동기
     actions:{
        async searchMovies({state, commit}, payload) {
            const { title, type, number, year } = payload
            const OMDB_API_KEY = '7035c60c'

            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
            const {Search, totalResults} = res.data
            commit('updateState',{
                movies : Search 
            })

            console.log(totalResults)
            console.log(typeof totalResults)

            const total = parseInt(totalResults, 10)
            const pageLength = Math.ceil(total / 10)

            if(pageLength > 1){
                for (let page = 2; page <= pageLength; page +=1 ){
                    if( page > number /10  ) break
                    const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                    const { Search } =res.data
                    commit ('updateState',{
                        movies: [...state.movies, ...Search]
                    })
                }
            }

        }
     }
}