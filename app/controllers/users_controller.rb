class UsersController < ApplicationController
    
    # GET to /users/:id
    def show 
        User.find( params[:id] )
    end
    
end