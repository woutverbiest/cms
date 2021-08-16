<?php

function custom_post_type() {
 

     $labels = array(
         'name'                => _x( 'Recipies', 'Post Type General Name', '' ),
         'singular_name'       => _x( 'Recipe', 'Post Type Singular Name', '' ),
         'menu_name'           => __( 'Recipe', '' ),
         'all_items'           => __( 'All Recipies', '' ),
         'view_item'           => __( 'View Recipe', '' ),
         'add_new_item'        => __( 'Add New Recipe', '' ),
         'edit_item'           => __( 'Edit Recipe', '' ),
         'update_item'         => __( 'Update Recipe', '' ),
     );

     $args = array(
        'label'               => __( 'recipes', '' ),
        'description'         => __( 'Recipies', '' ),
        'labels'              => $labels,
        'supports'            => array( 'Name', 'description', 'Minutes', 'for amount of people', 'Reviews' ),
        'taxonomies'          => array( 'Ingredients' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'show_in_rest' => true,
 
    );
     
    // Registering your Custom Post Type
    register_post_type( 'Recipe', $args );
 
}
 
/* Hook into the 'init' action so that the function
* Containing our post type registration is not 
* unnecessarily executed. 
*/
 
add_action( 'init', 'custom_post_type', 0 );