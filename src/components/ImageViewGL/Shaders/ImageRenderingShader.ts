import { Vector2, Vector3, Color } from "three"


export default {
    vertexShader: `
    varying vec2 vUv;
        uniform float time;
        uniform vec2 resolution;
        //VERTEX_UNIFORMS
        //VERTEX_PROCEDURES_DECL
        void main()	{
            vUv = uv;
            vec3 v_position = vec3(position * 2.);
            //VERTEX_PROCEDURE_CALLS
            gl_Position = vec4( v_position, 1.0 );
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 cursor;
        uniform float pointerover_time;
        uniform float pointerout_time;

        //FRAGMENT_UNIFORMS
        //FRAGMENT_PROCEDURES_DECL
        void main()	{
            float global_effect_power = 1.0;
            vec2 coord = vUv;
            vec4 color = vec4(1., 0., 0., 1.);
            //FRAGMENT_PROCEDURE_CALLS
            gl_FragColor = color;
        }
    `,
    get uniforms () {
        return {
            time: {
                type: "f",
                value: 0
            },
            resolution: {
                type: "v2",
                value: new Vector2(100, 100)
            },
            cursor: {
                type: "v2",
                value: new Vector2(0, 0)
            },
            pointerover_time: {
                type: "f",
                value: -1
            },
            pointerout_time: {
                type: "f",
                value: -1
            },
        }
    }
}