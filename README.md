# coliseo-web

A Web UI for the Coliseo game https://github.com/imnotteixeira/coliseo

## Development

Make sure you install the dependencies by running

```
npm install
```

Then, start the auto-build watcher

```
npm run watch
```

This command will rebuild the code every time you change a file, and output it to the `dist/` folder. Then, to serve the application:

```
npm start

# Or .....
# Use this one instead if you want the served app to update once it is recompiled, withou having to stop and restart
# This makes sure that when a source file changes, the rebuilt code starts being served automatically, just refresh the browser and you're all set!

npm run start-dev 
``` 