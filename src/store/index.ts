import Vue from 'vue'
import Vuex from 'vuex'
import { WebGLRenderer } from "three"
import { forEach } from "lodash-es"

Vue.use(Vuex)

class GameLoop {
  prev_frame_date: Number
  tasks: Object

  constructor () {
    this.prev_frame_date = +new Date()
    this.tasks = {}
  }

  randomString() {
      return (Math.random().toString(32).substring(2, 12)) + Math.random().toString(32).substring(2, 12);
  }
  
  add ( lambda: Function ) {
    let rand_string: String = this.randomString()
    this.tasks[rand_string] = lambda
    console.log(rand_string)
    return rand_string
  }

  remove (id: String) {
    delete this.tasks[id]
  }

  loop () {
    requestAnimationFrame(()=> this.loop())
    this.tick()
  }

  tick () {
    let now: Number = +new Date()
    let delta: Number = (now - this.prev_frame_date) / (1000/60)
    this.prev_frame_date = now

    forEach(this.tasks, (lambda: Function)=>{
      lambda(delta)
    })
  }

  run () {
    this.loop()
    return this
  }

}

// const gl_renderer = new WebGLRenderer({ antialias: false, alpha: true })
// gl_renderer.setClearColor(0x000000, 0)
// gl_renderer.autoClear = true

// window.glr = gl_renderer

export default new Vuex.Store({
  state: {
    // shader_time: 0,
    // gl_renderer: gl_renderer,
    game_loop: new GameLoop().run()
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
