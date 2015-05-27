# Notify
## A Dirt-Simple Notification System

### Install
```
$ git clone git@github.com:failpunk/notify.git notify
$ bower install
```

### Usage

#### Success Message
```js
Notify.success("Great Success!");
```

#### Error Message
```js
Notify.error("Epic Failure!", Notifier.locations.topMiddle);
```

#### More Options
```js
Notify.msg({
   type: 'success',
   title: "This Is A Title",
   message: "Here is your message.",
   location: Notify.locations.topLeft,
})
```

#### No Close Button
```js
Notify.msg({
  message: 'I will fade out after two seconds',
  timeout: 2000
});
```


