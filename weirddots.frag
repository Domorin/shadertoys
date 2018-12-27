#define PI 3.141592653589

float circle(vec2 circle_pos, vec2 pixel_pos, float radius)
{
    float l = length(pixel_pos - circle_pos);
    return 1.0-smoothstep(0., radius, l); 
}

float inverse_circle(vec2 circle_pos, vec2 pixel_pos, float radius)
{
    float l = length(pixel_pos - circle_pos);
    return smoothstep(0., radius, l); 
}


float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)    
    vec2 uv = (fragCoord/iResolution.xy * 2.) - 1.;  
    vec2 mouse = (iMouse.xy/iResolution.xy * 2.) - 1.;    

    
    uv.x += cos(iTime * 0.25 + uv.x * 5.50 + uv.y * 10.) * sin(iTime) * 0.1;
    uv.y += cos(iTime * 0.25 + uv.y * 23.25 + uv.x * 13.) * sin(iTime) * 0.01;
    
    float distance_from_mouse = length(uv - mouse);
    vec2 offset = uv-mouse;
    uv += offset * (1.-(distance_from_mouse/(sqrt(2.)))) * .2;

    

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    vec3 other_col = 0.5 + 0.5*cos(PI + iTime+uv.xyx+vec3(0,2,4));
    
    bool should_break = false;
    
    float circle_result = 0.;
    
    vec2 current_thing = vec2(-1.0, -1.0);    
    for(float i = 0.; i < 25.; i++)
    {
        current_thing.x = -1.0;
        for(float y = 0.; y < 25.; y++)
        {          
            
            
            
            //circle_result = circle(current_thing, uv, 0.025);5
            float modifier = (sin(iTime + uv.x * 23. + uv.y * 17.)+1.)/2. * 0.0125;
            circle_result = inverse_circle(current_thing + vec2(rand(current_thing) * 0.05),uv,0.025 + modifier);
            
            if(circle_result < 1.)
            {
                should_break = true;
                break;
            }

            current_thing.x += 0.09;
        }
        if(should_break)
        {
            break;
        }
        current_thing.y += 0.09;
    }    

    // Output to screen
    fragColor = vec4(col,1.0) * circle_result + vec4(other_col, 1.) * (1. - circle_result);
}
