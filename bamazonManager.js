

    inquirer.prompt([
        {
            name: 'artistChoice',
            type: 'list',
            message: "What would you like to do",
            choices: ['Choose an artist by Name' , 'Artist with multiple songs','Find data within a specific range','Find artists with top song and top albuums in the same year','Exit']
        }
      
    ]).then(function(answer){