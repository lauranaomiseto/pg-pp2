#include "rtweekend.h"

#include "camera.h"
#include "hittable.h"
#include "hittable_list.h"
#include "material.h"
#include "sphere.h"


int main() {
    hittable_list world;

    auto material_ground = make_shared<lambertian>(color(0.54, 0.61, 0.72)); 
    auto material_base = make_shared<metal>(color(0.67, 0.066, 0.025), 0.3);
    auto material_dome = make_shared<dielectric>(1.50);
    auto material_dome_bubble = make_shared<dielectric>(1.0/1.50);

    auto material_snow_hill = make_shared<lambertian>(color(0.83, 0.83, 0.86));
    auto material_snow = make_shared<lambertian>(color(0.92, 0.96, 0.98));
    auto material_tree = make_shared<lambertian>(color(0.13, 0.3, 0.06));
    auto material_star = make_shared<metal>(color(1, 0.9, 0.0), 0.4);
    auto material_ball = make_shared<metal>(color(0.78, 0.03, 0.03), 0.2);



    // auto material_glass = make_shared<dielectric>(1.50);

    world.add(make_shared<sphere>(point3(0.0, -101.0, -5.0), 100.0, material_ground));
    world.add(make_shared<sphere>(point3(0.0, -1.75, -5.0), 1.5, material_base));
    world.add(make_shared<sphere>(point3(0.0, 0.0, -5.0), 1.2, material_dome));
    world.add(make_shared<sphere>(point3(0.0, 0.0, -5.0), 1.1, material_dome_bubble));

    world.add(make_shared<sphere>(point3(0.0, -0.98, -5.0), 1, material_snow_hill));

    world.add(make_shared<sphere>(point3(0.0, -0.05, -5.0), 0.35, material_tree));
    world.add(make_shared<sphere>(point3(0.0, 0.30, -5.0), 0.25, material_tree));
    world.add(make_shared<sphere>(point3(0.0, 0.55, -5.0), 0.19, material_tree));
    world.add(make_shared<sphere>(point3(0.0, 0.75, -5.0), 0.125, material_tree));

    world.add(make_shared<sphere>(point3(0.0, 0.935, -5.0), 0.06, material_star));
    
    world.add(make_shared<sphere>(point3(-0.387, 0.381, -4.833), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.493, 0.545, -4.344), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.336, 0.366, -5.140), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.638, 0.499, -4.880), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.698, 0.487, -4.732), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.475, 0.525, -5.347), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.482, 0.202, -5.008), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.329, 0.556, -5.176), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.284, 0.380, -5.627), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.457, 0.715, -4.718), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.787, 0.1, -4.433), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.693, 0.2, -4.344), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.396, 0.9, -5.140), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.638, 0.09, -4.880), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.698, 0.15, -4.732), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.575, 0.1, -5.347), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.682, 0.11, -5.008), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.529, 0.07, -5.176), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(-0.584, 0.19, -5.627), 0.03, material_snow));
    world.add(make_shared<sphere>(point3(0.757, 0.21, -4.718), 0.03, material_snow));

    camera cam;

    cam.aspect_ratio      = 16.0 / 9.0;
    cam.image_width       = 800;
    cam.samples_per_pixel = 200;
    cam.max_depth         = 50;

    cam.vfov     = 25;
    cam.lookfrom = point3(0,2.5,2.5);
    cam.lookat   = point3(0,-0.3,-5.2);

    cam.vup      = vec3(0,1,0);

    cam.defocus_angle = 0.6;
    cam.focus_dist    = 7.0;

    cam.render(world);
}