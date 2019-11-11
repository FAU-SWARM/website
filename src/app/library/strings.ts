function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let sample_space = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function random(count: number) {
  var text = '';

  for (var i = 0; i < count; i++)
    text += sample_space.charAt(Math.floor(Math.random() * sample_space.length));

  return text;
}

function url_attach_params(url: string, params: {}): string {
  if (Object.keys(params).length > 0) {
    let param_string: string[] = [];
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        if (Array.isArray(value)) {
          for (const el of value) {
            param_string.push(`${key}=${el}`);
          }
        } else {
          param_string.push(`${key}=${value}`);
        }
      }
    }
    if (param_string.length > 0) {
      url = `${url}?${param_string.join('&')}`;
    }
  }
  return url;
}

function extract_params(url: string): {[param_name: string]: string[]} {
  let param_map: {[param_name: string]: string[]} = {};

  let url_split = url.split('?');
  if (url_split.length == 2) {
    let params = url_split[1];
    let parameters = params.split('&');
    for (const parameter of parameters) {
      const pair = parameter.split('=');
      if (!param_map.hasOwnProperty(pair[0])) {
        param_map[pair[0]] = [];
      }
      param_map[pair[0]].push(pair[1]);
    }
  }

  return param_map;
}

function remove_params(url: string): string {
  let url_split = url.split('?');
  return url_split[0];
}

export {
  capitalize, random, url_attach_params, extract_params, remove_params
};