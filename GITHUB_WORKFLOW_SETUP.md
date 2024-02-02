1. Set package name in `package.json`. The package name must start with `windy-plugin-`.
2. Create a new API key for `Windy Plugins API` service at https://api.windy.com/keys.
3. In your GitHub repository, go to `Settings`, `Secrets and Variables`, `Actions`. Click `New repository secret` and create secret `WINDY_API_KEY` with the API key you created at https://api.windy.com/keys.
4. To publish the plugin, go to `Actions`, `publish-plugin`, `Run workflow` and select the branch from which you want to publish the plugin.
5. After the workflow is finished, go to the job log, expand the `Publish Plugin` stage and copy the plugin installation URL.
