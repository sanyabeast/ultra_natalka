import procedures_lib from "./ShaderProcedures"
import { forEach } from "lodash-es"
import { Component } from 'vue'
import { TextureLoader, RepeatWrapping, Color } from "three"

export default {
    build (basic_shader: Object, procedures: Array<String>, component: Component) {
        let output = new Object({
            vertexShader: basic_shader.vertexShader,
            fragmentShader: basic_shader.fragmentShader,
            uniforms: {}
        })

        forEach(basic_shader.uniforms, (uniform_data: Object, name: String)=>{
            output.uniforms[name] = uniform_data
        })

        forEach(procedures, (name: String)=>{
            let procedure_id = this.makeid(16)

            let procedure_data = procedures_lib[name]

            if (procedure_data && procedure_data.fragment !== undefined){
                output.fragmentShader = output.fragmentShader.replace(/\/\/FRAGMENT_PROCEDURE_CALLS/gm, `
                     ${procedure_data.fragment}
                    //FRAGMENT_PROCEDURE_CALLS
                `)
            }

            if (procedure_data && procedure_data.vertex !== undefined){
                output.vertexShader = output.vertexShader.replace(/\/\/VERTEX_PROCEDURES_DECL/gm, `
                    ${procedure_data.vertex}
                    //VERTEX_PROCEDURES_DECL
                `)
            }

            if (procedure_data && procedure_data.uniforms !== undefined) {
                forEach(procedure_data.uniforms, (uniform_data: Object, uniform_name: String)=>{
                    let value = uniform_data.value

                    if (uniform_data.prop && component.shader_settings[uniform_data.prop] !== undefined) {
                        value = component.shader_settings[uniform_data.prop]
                    }

                    if(typeof this[`preprocess_${uniform_data.type}`] == "function"){
                        value = this[`preprocess_${uniform_data.type}`](value)
                    }

                    output.uniforms[uniform_name] = {
                        value: value,
                        type: uniform_data.type
                    }

                    if (uniform_data.shaders.indexOf("fragment") > -1){
                        output.fragmentShader = output.fragmentShader.replace(/\/\/FRAGMENT_UNIFORMS/gm, `
                            uniform ${this.get_glsl_type_name(uniform_data.type)} ${uniform_name};
                            //FRAGMENT_UNIFORMS 
                        `)

                    }

                    if (uniform_data.shaders.indexOf("vertex") > -1){
                        output.vertexShader = output.vertexShader.replace(/\/\/VERTEX_UNIFORMS/gm, `
                            uniform ${this.get_glsl_type_name(uniform_data.type)} ${uniform_name};
                            //VERTEX_UNIFORMS
                        `)

                    }
                })
            }
        })
        

        window.sh = output

        return output
    },
    preprocess_t(url: String){
        console.log(url)
        let t = new TextureLoader().load( url );
        t.wrapS = t.wrapT = RepeatWrapping;
        return t

    },
    preprocess_v3(value: any){
        let output = value

        if (typeof value == "string"){
            output = new Color()
            output.setHex(parseInt(value.substring(1, 10), 16))
        } 
        
        return output
    },
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    get_glsl_type_name(alias: String){
        let aliases = {
            "t": "sampler2D",
            "f": "float",
            "v2": "vec2",
            "v3": "vec3",
            "v4": "vec4"
        }

        return aliases[alias];
    }
}