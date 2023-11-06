<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyNovel extends Notification
{
	use Queueable;
	public $novel;
	/**
	 * Create a new notification instance.
	 */
	public function __construct($novel)
	{
		$this->novel = $novel;
	}
	/**
	 * Get the notification's delivery channels.
	 */
	public function via(object $notifiable): array
	{
		return ['database'];
	}
	/**
	 * Get the array representation of the notification.
	 */
	public function toArray(object $notifiable): array
	{
		return [
			'novel' => $this->novel['name_novel'],
			'chap' => $this->novel['name_chap'],
		];
	}
}
