import { Color } from "three"

export default {
    render: {
        fragment: `
            color = texture2D(diffuse_map, coord);
            color.w = 1.0;
        `,
        uniforms: {
            diffuse_map: {
                type: "t",
                value: "pics/image 8.png",
                prop: "shader_diffus_map_url",
                shaders: ["fragment"]
            }
        }
    },
    distortion: {
        fragment: `
            float move = 0.0;

            if (distortion_move > 0.){
                move = time * distortion_move_speed;
            }

            coord += (texture2D(distortion_map, vUv * distortion_scale + move).x - 0.5) * distortion_power * global_effect_power;
        `,
        uniforms: {
            distortion_move: {
                type: "f",
                value: 1,
                prop: "shader_distortion_move",
                shaders: ["fragment"]
            },
            distortion_move_speed: {
                type: "f",
                value: 1,
                prop: "shader_distortion_move_speed",
                shaders: ["fragment"]
            },
            distortion_scale: {
                type: "f",
                value: 0.5,
                prop: "shader_distortion_scale",
                shaders: ["fragment"]
            },
            distortion_power: {
                type: "f",
                value: 0.5,
                prop: "shader_distortion_power",
                shaders: ["fragment"]
            },
            distortion_map: {
                type: "t",
                value: "pics/image 8.png",
                prop: "shader_distortion_map_url",
                shaders: ["fragment"]
            }
        }
    },
    tint_on_hover: {
        fragment: `
            if (pointerover_time > 0.){
                float result_hover_tint_power = hover_tint_power * clamp((pointerover_time * hover_tint_speed), 0., 1.);
                color = vec4(mix(color.xyz, hover_tint_color, result_hover_tint_power), 1.);
            }

            if (pointerout_time > 0.){
                float result_hover_tint_power = ((1. - (clamp((pointerout_time * hover_tint_speed), 0., 1.))) * hover_tint_power);
                color = vec4(mix(color.xyz, hover_tint_color, result_hover_tint_power), 1.);
            }
        `,
        uniforms: {
            hover_tint_speed: {
                type: "f",
                value: 2,
                prop: "shader_tint_on_hover_speed",
                shaders: ["fragment"]
            },
            hover_tint_power: {
                type: "f",
                value: 0.2,
                prop: "shader_tint_on_hover_power",
                shaders: ["fragment"]
            },
            hover_tint_color: {
                type: "v3",
                value: "#ffff00",
                prop: "shader_tint_on_hover_color",
                shaders: ["fragment"]
            }

        }
    },
    sinusal_distortion: {
        fragment: `
            float sinusal_distortion = sin(coord.x * sinusal_distortion_freq) * sin(coord.y * sinusal_distortion_freq) * sinusal_distortion_amplitude;
            coord = coord + (sinusal_distortion * clamp(global_effect_power * sinusal_distortion_speed, 0., 1.));
        `,
        uniforms: {
            sinusal_distortion_speed: {
                type: "f",
                value: 2,
                prop: "shader_sinusal_distortion_speed",
                shaders: ["fragment"]
            },
            sinusal_distortion_amplitude: {
                type: "f",
                value: 1,
                prop: "shader_sinusal_distortion_amplitude",
                shaders: ["fragment"]
            },
            sinusal_distortion_freq: {
                type: "f",
                value: 10,
                prop: "shader_sinusal_distortion_freq",
                shaders: ["fragment"]
            },

        }
    },
    parabolic_global_effect_power_modifier: {
        fragment: `
            if (global_effect_power > 0.5){
                global_effect_power = 1. - global_effect_power;
            }

            global_effect_power = global_effect_power * 2.;
        `
    },
    increase_global_effect_power_on_hover: {
        fragment: `
            global_effect_power = clamp((pointerover_time * increase_global_effect_power_speed), 0., 1.);

            if (pointerout_time > -1.){
                global_effect_power = clamp(((1. - (pointerout_time * increase_global_effect_power_speed))), 0., 1.);
            }

        `,
        uniforms: {
            increase_global_effect_power_speed: {
                type: "f",
                value: 2,
                prop: "shader_increase_global_effect_power_speed",
                shaders: ["fragment"]
            },
        }
    }
}